export function createAutosave({ snapshot, persist, apply, status, delay = 1000 }) {
  let generation = 0, saved = 0, timer, running, paused = false;
  const pending = () => generation !== saved;
  function schedule() { clearTimeout(timer); if (!paused && pending()) timer = setTimeout(flush, delay); }
  function mark() { generation++; status('pending'); schedule(); }
  async function flush() {
    clearTimeout(timer);
    if (running) { await running; if (!paused && pending()) return flush(); return; }
    if (paused || !pending()) return;
    const version = generation, value = snapshot(); status('saving');
    let success = false;
    running = (async () => {
      try { const result = await persist(value); apply(result); saved = version; success = true; status(pending() ? 'pending' : 'saved'); }
      catch (error) { status('error', error); }
    })();
    await running; running = undefined;
    if (success && pending()) schedule();
  }
  function reset() { clearTimeout(timer); generation = saved = 0; paused = false; }
  return { mark, flush, pending, reset, pause() { paused = true; clearTimeout(timer); }, resume() { paused = false; schedule(); } };
}

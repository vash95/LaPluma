const panel = document.querySelector('#panel'), message = document.querySelector('#message');
let state, tab = 'posts', language = 'es', dirty = false;
const labels = {hero:'Portada',about:'Sobre el taller',services:'Servicios',servicesIntro:'Título de servicios',process:'Proceso',processIntro:'Título del proceso',gallery:'Galería',galleryIntro:'Título de galería',faq:'Preguntas frecuentes',faqIntro:'Título de preguntas',contact:'Contacto',buttons:'Botones',meta:'Título y descripción de la página',title:'Título',description:'Descripción',eyebrow:'Texto superior',cta:'Texto de invitación',highlights:'Destacados',caption:'Pie de foto',trust:'Mensaje de confianza',text:'Texto',email:'Email',subject:'Asunto del email',note:'Nota de contacto',question:'Pregunta',answer:'Respuesta',icon:'Icono',budget:'Pedir presupuesto',works:'Ver trabajos'};
function el(tag, text, cls) { const node = document.createElement(tag); if (text) node.textContent = text; if (cls) node.className = cls; return node; }
function button(text, action, cls='button button--secondary') { const b = el('button',text,cls); b.type='button'; b.addEventListener('click',action); return b; }
async function api(url, method='GET', data) {
 const headers = {'X-Requested-With':'LaPluma'}; if (data && !(data instanceof File)) headers['Content-Type']='application/json';
 const res = await fetch(url,{method,headers,body:data instanceof File ? data : data ? JSON.stringify(data) : undefined}); const result = await res.json();
 if (!res.ok) { if (res.status === 401 && url !== '/api/login') login(); throw new Error(result.error); } return result;
}
function report(error) { message.textContent = error.message; }
async function save() { try { const result = await api('/api/admin/content','PUT',state); if (result.revision !== undefined) state.revision = result.revision; dirty=false; message.textContent='Cambios guardados. Las publicaciones marcadas como publicadas ya aparecen en la web.'; } catch(e) {report(e);} }
function field(label,value,onChange, multiline=false) {
 const wrap=el('label',label), input=el(multiline?'textarea':'input'); input.value=value; if(multiline) input.rows=4;
 input.addEventListener('input',()=>{onChange(input.value);dirty=true;}); wrap.append(input); return wrap;
}
function login() {
 panel.replaceChildren(); const form=el('form',null,'section-card login'); form.append(el('h2','Accede a tu panel'));
 const email=el('input'), password=el('input');email.type='email';email.required=true;email.autocomplete='username';password.type='password';password.required=true;password.autocomplete='current-password';
 const a=el('label','Email'), b=el('label','Contraseña'); a.append(email);b.append(password);const submit=el('button','Entrar','button button--primary');submit.type='submit';form.append(a,b,submit);
 form.addEventListener('submit',async e=>{e.preventDefault();submit.disabled=true;try{await api('/api/login','POST',{email:email.value,password:password.value});password.value='';if(dirty && state){message.textContent='Sesión recuperada. Tus cambios pendientes siguen en el panel; puedes guardarlos.';render();}else await load();}catch(error){report(error);}finally{submit.disabled=false;}});panel.append(form);
}
async function load(){try{state=await api('/api/admin/content');dirty=false;message.textContent='';render();}catch(e){report(e);}}
function render(){
 panel.replaceChildren();const toolbar=el('div',null,'admin-toolbar');
 toolbar.append(button('Publicaciones',()=>{tab='posts';render();}),button('Textos de la web',()=>{tab='texts';render();}),button('Fotografías',()=>{tab='photos';render();}),button('Guardar cambios',save,'button button--primary'),button('Cerrar sesión',async()=>{if(dirty&&!confirm('Hay cambios sin guardar. ¿Quieres salir?'))return;try{await api('/api/logout','POST',{});dirty=false;login();}catch(e){report(e);}}));panel.append(toolbar);
 const area=el('section',null,'section-card');panel.append(area);
 if(tab==='photos') { area.append(el('h2','Fotografías de la web'),el('p','Sube imágenes JPG, PNG o WebP de hasta 4 MB. Después guarda los cambios.'));
 for(const key of ['hero',...Array.from({length:6},(_,i)=>`gallery-${i}`)]){const row=el('div',null,'photo-row');row.append(el('h3',key==='hero'?'Foto principal':`Galería · ${Number(key.slice(-1))+1}`)); imagePicker(row,state.photos[key]||'',url=>{state.photos[key]=url;dirty=true;});area.append(row);}return; }
 const select=el('select');for(const [code,name] of [['es','Español'],['en','English'],['ca','Català']]){const opt=el('option',name);opt.value=code;select.append(opt);}select.value=language;select.setAttribute('aria-label','Idioma del contenido');select.onchange=()=>{language=select.value;render();};area.append(select);
 if(tab==='texts'){area.append(el('h2','Edita los textos'),el('p','Despliega una sección y cambia sus campos. Cada idioma se guarda por separado.'));
 for(const key of Object.keys(state.content[language]).filter(k=>!['aria','navigation','languageName'].includes(k))){const details=el('details');details.append(el('summary',labels[key]||key));fields(details,state.content[language],key);area.append(details);}return;}
 area.append(el('h2','Publicaciones'),button('+ Nueva publicación',()=>{const p={id:crypto.randomUUID(),title:'Nueva publicación',body:'',image:'',date:new Date().toISOString().slice(0,10),status:'draft',language};state.posts.unshift(p);dirty=true;editPost(p,area);}));
 for(const post of state.posts.filter(p=>p.language===language)){const row=el('div',null,'post-row');row.append(el('strong',post.title),el('span',`${post.date} · ${post.status==='published'?'Publicada':'Borrador'}`),button('Editar',()=>editPost(post,area)),button('Eliminar',()=>{if(confirm(`¿Eliminar «${post.title}»? Guarda después para confirmar el cambio.`)){state.posts=state.posts.filter(p=>p.id!==post.id);dirty=true;render();}}));area.append(row);}
 if(!state.posts.some(p=>p.language===language))area.append(el('p','Todavía no hay publicaciones en este idioma. Crea la primera para compartir tus trabajos.'));
}
function fields(parent,obj,key){ const value=obj[key];if(typeof value==='string'){parent.append(field(labels[key]||(/^\d+$/.test(key)?`Elemento ${Number(key)+1}`:key),value,v=>obj[key]=v,true));}else{for(const child of Object.keys(value)){if(typeof value[child]==='object'){const group=el('fieldset');group.append(el('legend',`Elemento ${Number(child)+1}`));fields(group,value,child);parent.append(group);}else fields(parent,value,child);}}}
function imagePicker(parent,url,onChange){const preview=el('img');preview.alt='Vista previa de la fotografía';preview.hidden=!url;preview.src=url||'';parent.append(preview);const label=el('label','Subir fotografía'),input=el('input');input.type='file';input.accept='image/jpeg,image/png,image/webp';label.append(input);parent.append(label);
 input.onchange=async()=>{const file=input.files[0];if(!file)return;if(file.size>4_000_000){report(new Error('La imagen debe pesar hasta 4 MB'));return;}input.disabled=true;try{const uploaded=await api('/api/admin/upload','POST',file);onChange(uploaded.url);preview.src=uploaded.url;preview.hidden=false;message.textContent='Imagen subida. Guarda los cambios para mostrarla en la web.';}catch(e){report(e);}finally{input.disabled=false;}};
 parent.append(button('Quitar foto',()=>{onChange('');preview.hidden=true;input.value='';}));}
function editPost(post,area){area.replaceChildren(el('h2','Editar publicación'),field('Título',post.title,v=>post.title=v),field('Texto',post.body,v=>post.body=v,true),field('Fecha (AAAA-MM-DD)',post.date,v=>post.date=v));
 imagePicker(area,post.image,v=>{post.image=v;dirty=true;}); const label=el('label','Visibilidad'),select=el('select');for(const [value,text]of [['draft','Borrador — solo visible en el panel'],['published','Publicada — visible en la web']]){const opt=el('option',text);opt.value=value;select.append(opt);}select.value=post.status;select.onchange=()=>{post.status=select.value;dirty=true;};label.append(select);area.append(label,button('Guardar publicación',save,'button button--primary'),button('Volver a publicaciones',render));}
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
try{const session=await api('/api/session');if(session.authenticated)await load();else login();}catch(e){report(e);}

const g=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];function h(t,a,e){const n=[],[o,d]=t.split(":").map(Number),[s,c]=a.split(":").map(Number);let r=o*60+d;const i=s*60+c;if(r>=i)return alert("La hora de inicio debe ser anterior a la hora de fin"),[];for(;r<=i;){const l=Math.floor(r/60),y=r%60;n.push(`${String(l).padStart(2,"0")}:${String(y).padStart(2,"0")}`),r+=e}return n}function v(t){const a=document.getElementById("daySchedulesContainer");if(!a)return;let e={};if(t.daySchedules)e=t.daySchedules;else for(let n=0;n<=6;n++){const o=n.toString();e[o]={enabled:t.openDays.includes(o),times:t.openDays.includes(o)?t.openTimes:[]}}a.innerHTML="";for(let n=0;n<=6;n++){const o=n.toString(),d=e[o]||{enabled:!1,times:[]},s=document.createElement("div");s.className="day-schedule-panel",s.dataset.day=o;const c=document.createElement("div");c.className="day-schedule-header",c.innerHTML=`
      <button type="button" class="day-toggle-btn" data-day="${o}">
        <span class="day-name">${g[n]}</span>
        <span class="toggle-icon">▼</span>
      </button>
      <label class="day-enabled-toggle">
        <input type="checkbox" class="day-enabled-checkbox" data-day="${o}" ${d.enabled?"checked":""}>
        <span class="toggle-track"></span>
        <span class="toggle-label">Activo</span>
      </label>
    `;const r=document.createElement("div");r.className="day-schedule-body"+(d.enabled?" expanded":""),r.innerHTML=`
      <div class="time-generator">
        <h4>Generador de Horarios:</h4>
        <div class="generator-row">
          <div class="generator-field">
            <label>De:</label>
            <input type="time" class="time-input start-time" data-day="${o}" value="12:00">
          </div>
          <div class="generator-field">
            <label>A:</label>
            <input type="time" class="time-input end-time" data-day="${o}" value="22:00">
          </div>
          <div class="generator-field">
            <label>Intervalo:</label>
            <select class="interval-select" data-day="${o}">
              <option value="30">30 min</option>
              <option value="60">1 hora</option>
              <option value="90">1.5 horas</option>
              <option value="120">2 horas</option>
            </select>
          </div>
          <button type="button" class="generate-btn" data-day="${o}">Generar</button>
        </div>
      </div>
      <div class="time-editor">
        <label>Horarios (uno por línea):</label>
        <textarea class="day-times-textarea" data-day="${o}" rows="6" placeholder="12:00&#10;13:00&#10;14:00">${d.times.join(`
`)}</textarea>
      </div>
    `,s.appendChild(c),s.appendChild(r),a.appendChild(s),c.querySelector(".day-toggle-btn")?.addEventListener("click",()=>f(o)),c.querySelector(".day-enabled-checkbox")?.addEventListener("change",m=>{m.target.checked?r.classList.add("expanded"):r.classList.remove("expanded")}),r.querySelector(".generate-btn")?.addEventListener("click",()=>b(o))}}function f(t){const a=document.querySelector(`.day-schedule-panel[data-day="${t}"]`);if(!a)return;const e=a.querySelector(".day-schedule-body"),n=a.querySelector(".toggle-icon");e?.classList.toggle("expanded"),n&&(n.textContent=e?.classList.contains("expanded")?"▲":"▼")}function b(t){const a=document.querySelector(`.start-time[data-day="${t}"]`),e=document.querySelector(`.end-time[data-day="${t}"]`),n=document.querySelector(`.interval-select[data-day="${t}"]`),o=document.querySelector(`.day-times-textarea[data-day="${t}"]`);if(!a||!e||!n||!o)return;const d=a.value,s=e.value,c=parseInt(n.value);if(!d||!s){alert("Por favor ingresa horarios de inicio y fin");return}const r=h(d,s,c);r.length>0&&(o.value=r.join(`
`))}async function p(){try{const e=(await(await fetch("/api/settings")).json()).settings;document.getElementById("maxSeatsTotal").value=e.maxSeatsTotal,document.getElementById("maxSeatsPerReservation").value=e.maxSeatsPerReservation,document.getElementById("reservationDuration").value=e.reservationDuration,document.getElementById("advanceBookingDays").value=e.advanceBookingDays,v(e)}catch(t){console.error("Error loading settings:",t)}}document.getElementById("settingsForm")?.addEventListener("submit",async t=>{t.preventDefault();const a=t.target,e=new FormData(a),n={};for(let d=0;d<=6;d++){const s=d.toString(),c=document.querySelector(`.day-enabled-checkbox[data-day="${s}"]`),r=document.querySelector(`.day-times-textarea[data-day="${s}"]`);if(c&&r){const i=r.value.split(`
`).map(l=>l.trim()).filter(l=>l&&/^[0-2]?[0-9]:[0-5][0-9]$/.test(l));n[s]={enabled:c.checked,times:i}}}const o={maxSeatsTotal:parseInt(e.get("maxSeatsTotal")),maxSeatsPerReservation:parseInt(e.get("maxSeatsPerReservation")),reservationDuration:parseInt(e.get("reservationDuration")),advanceBookingDays:parseInt(e.get("advanceBookingDays")),daySchedules:n};try{(await fetch("/api/settings",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})).ok?(alert("Configuración guardada exitosamente"),p()):alert("Error al guardar configuración")}catch(d){console.error("Error saving settings:",d),alert("Error al guardar configuración")}});async function u(){try{const a=await(await fetch("/api/closed-dates")).json(),e=document.getElementById("closedDatesList");if(!e)return;if(a.closedDates.length===0){e.innerHTML='<div class="no-data">(No hay fechas cerradas)</div>';return}e.innerHTML=a.closedDates.map(n=>`
      <div class="closed-date-item">
        <span class="closed-date-info">
          <span class="date">${S(n.date)}</span>
          <span class="separator">-</span>
          <span class="reason">${n.reason}</span>
        </span>
        <button type="button" class="delete-btn small" data-id="${n.id}">Eliminar</button>
      </div>
    `).join(""),e.querySelectorAll(".delete-btn").forEach(n=>{n.addEventListener("click",async o=>{const s=o.target.dataset.id;s&&confirm("¿Eliminar esta fecha cerrada?")&&await D(s)})})}catch(t){console.error("Error loading closed dates:",t)}}function S(t){const a=new Date(t),e=a.getUTCFullYear(),n=String(a.getUTCMonth()+1).padStart(2,"0");return`${String(a.getUTCDate()).padStart(2,"0")}/${n}/${e}`}async function E(t,a){if(!t||!a){alert("Por favor completa todos los campos");return}try{const e=await fetch("/api/closed-dates",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({date:t,reason:a})});if(e.ok)u(),document.getElementById("closedDateInput").value="",document.getElementById("closedReasonInput").value="";else{const n=await e.json();alert(n.error||"Error al agregar fecha cerrada")}}catch(e){console.error("Error adding closed date:",e),alert("Error al agregar fecha cerrada")}}async function D(t){try{(await fetch(`/api/closed-dates/${t}`,{method:"DELETE"})).ok?u():alert("Error al eliminar fecha cerrada")}catch(a){console.error("Error deleting closed date:",a),alert("Error al eliminar fecha cerrada")}}document.getElementById("addClosedDateBtn")?.addEventListener("click",()=>{const t=document.getElementById("closedDateInput"),a=document.getElementById("closedReasonInput");t&&a&&E(t.value,a.value)});p();u();

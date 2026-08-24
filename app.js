const clients = [
  { name: 'Amelia Stone', email: 'amelia.stone@email.com', initials: 'AS', plan: 'Strength & conditioning', progress: 82, next: 'Today, 08:00', color: 'coral' },
  { name: 'Marcus Chen', email: 'marcus.chen@email.com', initials: 'MC', plan: 'Mobility reset', progress: 64, next: 'Today, 10:30', color: 'blue' },
  { name: 'Sofia Williams', email: 'sofia.williams@email.com', initials: 'SW', plan: 'Foundations · 8 weeks', progress: 91, next: 'Today, 13:00', color: 'olive' },
  { name: 'Leo Martins', email: 'leo.martins@email.com', initials: 'LM', plan: 'Full body training', progress: 48, next: 'Today, 17:30', color: 'lavender' }
];

const rows = document.querySelector('#client-rows');
const search = document.querySelector('#client-search');
const dialog = document.querySelector('#client-dialog');
const form = document.querySelector('#client-form');

function renderClients(filter = '') {
  const visible = clients.filter(client => client.name.toLowerCase().includes(filter.toLowerCase()));
  rows.innerHTML = visible.map(client => `
    <div class="client-row">
      <div class="client-name"><span class="attention-avatar ${client.color}">${client.initials}</span><div><strong>${client.name}</strong><small>${client.email}</small></div></div>
      <span class="plan">${client.plan}</span>
      <span class="progress-wrap"><span class="progress"><i style="width:${client.progress}%"></i></span>${client.progress}%</span>
      <span>${client.next}</span><span class="chevron">›</span>
    </div>`).join('') || '<div class="client-row"><span>No clients found.</span></div>';
}

function changeView(view) {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === view));
  const label = view === 'overview' ? 'Overview' : view.replace('-', ' ');
  document.querySelector('#page-title').textContent = label.charAt(0).toUpperCase() + label.slice(1);
  if (view !== 'overview') document.querySelector('#headline').textContent = `${label.charAt(0).toUpperCase() + label.slice(1)} at a glance.`;
}

document.querySelectorAll('[data-view]').forEach(item => item.addEventListener('click', () => changeView(item.dataset.view)));
search.addEventListener('input', event => renderClients(event.target.value));
document.querySelector('#add-client').addEventListener('click', () => dialog.showModal());
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  clients.unshift({ name, email: data.get('email'), initials: name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase(), plan: data.get('plan'), progress: 0, next: 'Not scheduled', color: 'blue' });
  renderClients(search.value);
  dialog.close();
  form.reset();
});
renderClients();

const dayOrder = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

const clients = [
  { id: 'amelia', name: 'Amélia Pereira', email: 'amelia.pereira@email.com', initials: 'AP', progress: 82, color: 'coral', focus: 'Força geral' },
  { id: 'marcus', name: 'Marcus Chen', email: 'marcus.chen@email.com', initials: 'MC', progress: 64, color: 'blue', focus: 'Mobilidade' },
  { id: 'sofia', name: 'Sofia Williams', email: 'sofia.williams@email.com', initials: 'SW', progress: 91, color: 'olive', focus: 'Core e postura' },
  { id: 'leo', name: 'Leo Martins', email: 'leo.martins@email.com', initials: 'LM', progress: 48, color: 'lavender', focus: 'Resistência' },
  { id: 'marina', name: 'Marina Costa', email: 'marina.costa@email.com', initials: 'MC', progress: 74, color: 'mint', focus: 'Condicionamento' }
];

const trainings = [
  { id: 1, clientId: 'amelia', title: 'Treino de força', category: 'Força', time: '08:00', duration: '45 min', notes: 'Foco em agachamento e puxada.', frequency: 'semanal', dayName: 'Segunda', exercises: [
    { name: 'Agachamento livre', weight: 20, reps: 8, seconds: 0 },
    { name: 'Remada baixa', weight: 18, reps: 10, seconds: 0 },
    { name: 'Burpee', weight: 0, reps: 0, seconds: 25 }
  ] },
  { id: 2, clientId: 'amelia', title: 'Cardio leve', category: 'Cardio', time: '18:30', duration: '30 min', notes: 'Bike + mobilidade.', frequency: 'semanal', dayName: 'Quarta', exercises: [
    { name: 'Bike', weight: 0, reps: 0, seconds: 180 }
  ] },
  { id: 3, clientId: 'marcus', title: 'Mobilidade de ombros', category: 'Mobilidade', time: '10:30', duration: '40 min', notes: 'Alongamento e ativação', frequency: 'semanal', dayName: 'Quinta', exercises: [
    { name: 'Rotação de ombro', weight: 0, reps: 12, seconds: 0 },
    { name: 'Alongamento de peitoral', weight: 0, reps: 0, seconds: 30 }
  ] },
  { id: 4, clientId: 'marcus', title: 'Reavaliação mensal', category: 'Avaliação', time: '09:00', duration: '60 min', notes: 'Avaliar amplitude e dor', frequency: 'mensal', dayNumber: 15, exercises: [
    { name: 'Avaliação de amplitude', weight: 0, reps: 0, seconds: 60 }
  ] },
  { id: 5, clientId: 'sofia', title: 'Treino de core', category: 'Core', time: '07:30', duration: '35 min', notes: 'Exercícios abs e estabilização.', frequency: 'semanal', dayName: 'Terça', exercises: [
    { name: 'Prancha', weight: 0, reps: 0, seconds: 45 },
    { name: 'Dead bug', weight: 0, reps: 12, seconds: 0 }
  ] },
  { id: 6, clientId: 'sofia', title: 'Ajuste postural', category: 'Recuperação', time: '16:00', duration: '50 min', notes: 'Alongamento e mobilidade de coluna.', frequency: 'mensal', dayNumber: 4, exercises: [
    { name: 'Alongamento de coluna', weight: 0, reps: 0, seconds: 40 }
  ] },
  { id: 7, clientId: 'leo', title: 'Circuito de resistência', category: 'Força', time: '17:00', duration: '50 min', notes: 'Circuito de baixa intensidade.', frequency: 'semanal', dayName: 'Sexta', exercises: [
    { name: 'Agachamento goblet', weight: 12, reps: 10, seconds: 0 },
    { name: 'Flexão de parede', weight: 0, reps: 12, seconds: 0 },
    { name: 'Corrida leve', weight: 0, reps: 0, seconds: 30 }
  ] },
  { id: 8, clientId: 'marina', title: 'Treino funcional', category: 'Força', time: '08:30', duration: '45 min', notes: 'Agachamento, remada e corrida.', frequency: 'semanal', dayName: 'Segunda', exercises: [
    { name: 'Agachamento com kettlebell', weight: 14, reps: 10, seconds: 0 },
    { name: 'Remada', weight: 16, reps: 8, seconds: 0 },
    { name: 'Sprint leve', weight: 0, reps: 0, seconds: 20 }
  ] },
  { id: 9, clientId: 'marina', title: 'Mobilidade e recuperação', category: 'Mobilidade', time: '18:00', duration: '35 min', notes: 'Alongamento + relaxamento.', frequency: 'semanal', dayName: 'Quinta', exercises: [
    { name: 'Alongamento de quadril', weight: 0, reps: 0, seconds: 35 }
  ] },
  { id: 10, clientId: 'marina', title: 'Acompanhamento mensal', category: 'Avaliação', time: '09:00', duration: '60 min', notes: 'Acompanhamento de progresso.', frequency: 'mensal', dayNumber: 20, exercises: [
    { name: 'Teste de desempenho', weight: 0, reps: 0, seconds: 60 }
  ] },
  { id: 11, clientId: 'amelia', title: 'Avaliação técnica', category: 'Avaliação', time: '09:00', duration: '60 min', notes: 'Mensal para progresso e ajuste.', frequency: 'mensal', dayNumber: 12, exercises: [
    { name: 'Avaliação de técnica', weight: 0, reps: 0, seconds: 60 }
  ] },
  { id: 12, clientId: 'leo', title: 'Treino de resistência', category: 'Força', time: '08:00', duration: '40 min', notes: 'Força de membros inferiores.', frequency: 'mensal', dayNumber: 27, exercises: [
    { name: 'Leg press', weight: 30, reps: 10, seconds: 0 },
    { name: 'Puxada baixa', weight: 20, reps: 8, seconds: 0 }
  ] }
];

const state = {
  currentRole: 'admin',
  currentView: 'overview',
  currentClientId: 'marina',
  editingPlanId: null
};

const elements = {
  welcomeRow: document.querySelector('#welcome-row'),
  metricsGrid: document.querySelector('#metrics-grid'),
  mainGrid: document.querySelector('#main-grid'),
  contentPanel: document.querySelector('#content-panel'),
  sidebarName: document.querySelector('#sidebar-name'),
  sidebarRole: document.querySelector('#sidebar-role'),
  sidebarAvatar: document.querySelector('#sidebar-avatar'),
  topbarUser: document.querySelector('#topbar-user-name'),
  topbarAvatar: document.querySelector('#topbar-avatar'),
  pageTitle: document.querySelector('#page-title'),
  planDialog: document.querySelector('#plan-dialog'),
  planForm: document.querySelector('#plan-form'),
  planClientSelect: document.querySelector('#plan-client-id'),
  planFrequency: document.querySelector('#plan-frequency'),
  planDayName: document.querySelector('#plan-day-name'),
  planDayNumber: document.querySelector('#plan-day-number'),
  planDialogTitle: document.querySelector('#plan-dialog-title')
};

function getCurrentUser() {
  return state.currentRole === 'admin'
    ? { name: 'Jordan Miles', initials: 'JM', roleLabel: 'Administrador' }
    : { name: 'Marina Costa', initials: 'MC', roleLabel: 'Cliente' };
}

function getCurrentClient() {
  return clients.find((client) => client.id === state.currentClientId) || clients[0];
}

function getClientById(clientId) {
  return clients.find((client) => client.id === clientId) || clients[0];
}

function getClientPlans(clientId) {
  return trainings.filter((plan) => plan.clientId === clientId);
}

function getCurrentRolePlans() {
  return state.currentRole === 'admin'
    ? trainings
    : getClientPlans(state.currentClientId);
}

function getNextPlanForClient(clientId) {
  const plans = getClientPlans(clientId).sort((a, b) => {
    const dayA = a.frequency === 'semanal' ? dayOrder.indexOf(a.dayName) : 7;
    const dayB = b.frequency === 'semanal' ? dayOrder.indexOf(b.dayName) : 7;
    return dayA - dayB;
  });

  return plans[0] || null;
}

function getTodayName() {
  const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  return dayNames[new Date().getDay()];
}

function formatViewLabel(view) {
  const labels = {
    overview: 'Visão geral',
    clients: 'Clientes',
    plans: 'Planos',
    messages: 'Mensagens'
  };

  return labels[view] || 'Visão geral';
}

function renderAccountHeader() {
  const user = getCurrentUser();
  elements.sidebarName.textContent = user.name;
  elements.sidebarRole.textContent = user.roleLabel;
  elements.sidebarAvatar.textContent = user.initials;
  elements.topbarUser.textContent = user.name;
  elements.topbarAvatar.textContent = user.initials;
  elements.pageTitle.textContent = formatViewLabel(state.currentView);

  document.querySelectorAll('.switch-button').forEach((button) => {
    button.classList.toggle('active', button.dataset.role === state.currentRole);
  });

  document.querySelectorAll('.nav-item[data-view]').forEach((button) => {
    button.classList.toggle('active', button.dataset.view === state.currentView);
  });
}

function renderWelcomeRow() {
  const user = getCurrentUser();
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bom dia' : currentHour < 18 ? 'Boa tarde' : 'Boa noite';
  const actionButton = state.currentRole === 'admin'
    ? '<button class="primary-button" data-action="open-plan-dialog">＋ Novo treino</button>'
    : '<button class="primary-button" data-action="open-plan-dialog">＋ Ver agenda</button>';

  elements.welcomeRow.innerHTML = `
    <div>
      <p class="eyebrow">${new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
      <h1>${greeting}, ${user.name.split(' ')[0]}.</h1>
      <p class="subhead">${state.currentRole === 'admin' ? 'Aqui está o que está acontecendo com seus clientes hoje.' : 'Seu plano está atualizado e pronto para a semana.'}</p>
    </div>
    ${actionButton}
  `;
}

function renderMetrics() {
  if (state.currentRole === 'admin') {
    const weeklyTotal = trainings.filter((plan) => plan.frequency === 'semanal').length;
    const activeClients = clients.length;
    const completionRate = 76;

    elements.metricsGrid.innerHTML = `
      <article class="metric-card">
        <div class="metric-label">Clientes ativos <span class="metric-icon mint">◎</span></div>
        <strong>${activeClients}</strong>
        <span class="trend positive">↗ 8,3% <em>vs. mês anterior</em></span>
      </article>
      <article class="metric-card">
        <div class="metric-label">Sessões nesta semana <span class="metric-icon peach">◷</span></div>
        <strong>${weeklyTotal}</strong>
        <span class="trend positive">↗ 12,0% <em>vs. semana passada</em></span>
      </article>
      <article class="metric-card">
        <div class="metric-label">Planos concluídos <span class="metric-icon lavender">✓</span></div>
        <strong>${completionRate}%</strong>
        <span class="trend positive">↗ 4,2% <em>vs. mês anterior</em></span>
      </article>
      <article class="metric-card">
        <div class="metric-label">Mensagens não lidas <span class="metric-icon yellow">✉</span></div>
        <strong>4</strong>
        <span class="trend neutral">Precisa de atenção</span>
      </article>
    `;
    return;
  }

  const clientPlans = getClientPlans(state.currentClientId);
  const nextPlan = clientPlans.find((plan) => plan.frequency === 'semanal') || clientPlans[0];
  const progress = getCurrentClient().progress;

  elements.metricsGrid.innerHTML = `
    <article class="metric-card">
      <div class="metric-label">Treinos nesta semana <span class="metric-icon mint">◎</span></div>
      <strong>${clientPlans.filter((plan) => plan.frequency === 'semanal').length}</strong>
      <span class="trend positive">↗ 3 treinos <em>na sua rotina</em></span>
    </article>
    <article class="metric-card">
      <div class="metric-label">Próximo treino <span class="metric-icon peach">◷</span></div>
      <strong>${nextPlan ? nextPlan.title : 'Sem treino'}</strong>
      <span class="trend positive">${nextPlan ? `${nextPlan.dayName} • ${nextPlan.time}` : 'Sem agendamento'}</span>
    </article>
    <article class="metric-card">
      <div class="metric-label">Progresso <span class="metric-icon lavender">✓</span></div>
      <strong>${progress}%</strong>
      <span class="trend positive">↗ 6,4% <em>no último mês</em></span>
    </article>
    <article class="metric-card">
      <div class="metric-label">Foco do mês <span class="metric-icon yellow">✦</span></div>
      <strong>${getCurrentClient().focus}</strong>
      <span class="trend neutral">Ajustes personalizados</span>
    </article>
  `;
}

function renderAdminSchedule() {
  const todayName = getTodayName();
  const todayPlans = trainings.filter((plan) => plan.frequency === 'semanal' && plan.dayName === todayName);

  const scheduleHtml = todayPlans.length
    ? todayPlans.map((plan) => {
        const client = getClientById(plan.clientId);
        return `
          <div class="schedule-item">
            <span class="time">${plan.time}</span>
            <span class="schedule-line ${['mint','peach','lavender','yellow'][Math.abs(client.name.length % 4)]}-line"></span>
            <div>
              <strong>${plan.title}</strong>
              <span>${client.name} · ${plan.category}</span>
            </div>
            <button class="status upcoming" data-edit-plan="${plan.id}">Editar</button>
          </div>
        `;
      }).join('')
    : '<div class="empty-state">Nenhum treino agendado para hoje.</div>';

  const attention = [
    { initial: 'AS', color: 'coral', title: 'Amélia enviou mensagem', text: '“Podemos ajustar o treino de quarta?”' },
    { initial: 'MC', color: 'blue', title: 'Marcus tem plano em vencimento', text: 'Expira em 3 dias' },
    { initial: 'SW', color: 'olive', title: 'Sofia enviou novo check-in', text: 'Atualização enviada ontem' }
  ];

  return `
    <article class="panel schedule-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Hoje</p>
          <h2>Agenda de treinos</h2>
        </div>
        <button class="text-button" data-action="open-plan-dialog">Ver calendário →</button>
      </div>
      <div class="schedule-list">${scheduleHtml}</div>
    </article>
    <article class="panel attention-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Atenção</p>
          <h2>Pendências</h2>
        </div>
        <span class="panel-badge">3 itens</span>
      </div>
      <div class="attention-list">
        ${attention.map((item) => `
          <button class="attention-item" type="button">
            <span class="attention-avatar ${item.color}">${item.initial}</span>
            <span>
              <strong>${item.title}</strong>
              <small>“${item.text}”</small>
            </span>
            <span class="arrow">→</span>
          </button>
        `).join('')}
      </div>
      <button class="bottom-link" type="button">Ver todas as notificações</button>
    </article>
  `;
}

function renderClientSchedule() {
  const clientPlans = getClientPlans(state.currentClientId);
  const upcoming = clientPlans.slice(0, 4);

  const scheduleHtml = upcoming.length
    ? upcoming.map((plan) => `
      <div class="schedule-item">
        <span class="time">${plan.dayName || `Dia ${plan.dayNumber}`}</span>
        <span class="schedule-line ${(plan.category === 'Mobilidade' ? 'peach' : plan.category === 'Avaliação' ? 'lavender' : 'mint')}-line"></span>
        <div>
          <strong>${plan.title}</strong>
          <span>${plan.category} · ${plan.time}</span>
        </div>
        <button class="status ${(plan.frequency === 'mensal' ? 'confirmed' : 'upcoming')}" data-edit-plan="${plan.id}">${plan.frequency === 'mensal' ? 'Mensal' : 'Semanal'}</button>
      </div>
    `).join('')
    : '<div class="empty-state">Ainda não há treinos ajustados para você.</div>';

  return `
    <article class="panel schedule-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Seu plano</p>
          <h2>Próximos treinos</h2>
        </div>
        <button class="text-button" data-action="open-plan-dialog">Detalhes →</button>
      </div>
      <div class="schedule-list">${scheduleHtml}</div>
    </article>
    <article class="panel attention-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Foco</p>
          <h2>Meta semanal</h2>
        </div>
        <span class="panel-badge">3x / semana</span>
      </div>
      <div class="attention-list">
        <div class="message-card">
          <span class="modal-tag">Força</span>
          <strong>Treino de força + mobilidade</strong>
          <small>Manter consistência e melhorar movimento na coluna e quadril.</small>
        </div>
        <div class="message-card">
          <span class="modal-tag">Recuperação</span>
          <strong>Hidratação e descanso</strong>
          <small>Priorizar 7+ horas de sono e alongamentos de recuperação.</small>
        </div>
      </div>
    </article>
  `;
}

function renderClientTable() {
  const rows = clients.map((client) => {
    const plans = getClientPlans(client.id);
    const nextPlan = plans[0] || null;

    return `
      <div class="client-row" data-client-row="${client.id}">
        <div class="client-name">
          <span class="attention-avatar ${client.color}">${client.initials}</span>
          <div>
            <strong>${client.name}</strong>
            <small>${client.email}</small>
          </div>
        </div>
        <span class="plan">${nextPlan ? nextPlan.title : 'Sem plano'}</span>
        <span class="progress-wrap"><span class="progress"><i style="width:${client.progress}%"></i></span>${client.progress}%</span>
        <span>${nextPlan ? `${nextPlan.dayName || `Dia ${nextPlan.dayNumber}`} • ${nextPlan.time}` : 'Sem agenda'}</span>
        <span class="chevron">›</span>
      </div>
    `;
  }).join('');

  return `
    <div class="panel clients-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Seu time</p>
          <h2>Clientes recentes</h2>
        </div>
        <div class="table-actions">
          <label class="search"><span>⌕</span><input type="search" placeholder="Buscar cliente"></label>
          <button class="filter-button" type="button">Filtrar ⌄</button>
          <button class="text-button" type="button" data-action="open-plan-dialog">Adicionar treino →</button>
        </div>
      </div>
      <div class="client-table">
        <div class="table-head">
          <span>Cliente</span>
          <span>Treino atual</span>
          <span>Progresso</span>
          <span>Próximo</span>
          <span></span>
        </div>
        ${rows}
      </div>
    </div>
  `;
}

function summarizeExercises(exercises = []) {
  if (!Array.isArray(exercises) || !exercises.length) {
    return 'Sem exercícios';
  }

  const count = exercises.length;
  const totalWeight = exercises.reduce((sum, item) => sum + Number(item.weight || 0), 0);
  return `${count} exercício${count === 1 ? '' : 's'} • ${totalWeight} kg`;
}

function renderPlanBoard() {
  const relevantPlans = state.currentRole === 'admin'
    ? trainings
    : getClientPlans(state.currentClientId);

  const weeklyPlans = relevantPlans.filter((plan) => plan.frequency === 'semanal');
  const monthlyPlans = relevantPlans.filter((plan) => plan.frequency === 'mensal');

  const cards = dayOrder.map((dayName) => {
    const items = weeklyPlans.filter((plan) => plan.dayName === dayName);
    const itemHtml = items.length
      ? items.map((plan) => {
          const client = state.currentRole === 'admin' ? getClientById(plan.clientId) : getCurrentClient();
          return `
            <div class="session-card">
              <span class="modal-tag">${plan.category}</span>
              <strong>${plan.title}</strong>
              <div class="session-meta">
                <span>${state.currentRole === 'admin' ? client.name : getCurrentClient().name}</span>
                <span>${plan.time}</span>
              </div>
              <small>${summarizeExercises(plan.exercises)}</small>
              <div class="session-actions">
                <button class="inline-button" type="button" data-edit-plan="${plan.id}">Editar</button>
              </div>
            </div>
          `;
        }).join('')
      : '<div class="empty-state">Nenhum treino</div>';

    return `
      <div class="day-column">
        <h3>${dayName}</h3>
        <div class="session-list">${itemHtml}</div>
      </div>
    `;
  }).join('');

  const monthlyHtml = monthlyPlans.length
    ? monthlyPlans.map((plan) => {
        const client = getClientById(plan.clientId);
        return `
          <div class="session-card">
            <span class="modal-tag">Mensal</span>
            <strong>${plan.title}</strong>
            <div class="session-meta">
              <span>${state.currentRole === 'admin' ? client.name : getCurrentClient().name}</span>
              <span>Dia ${plan.dayNumber}</span>
            </div>
            <small>${summarizeExercises(plan.exercises)}</small>
            <div class="session-actions">
              <button class="inline-button" type="button" data-edit-plan="${plan.id}">Editar</button>
            </div>
          </div>
        `;
      }).join('')
    : '<div class="empty-state">Nenhum treino mensal agendado.</div>';

  return `
    <div class="board-wrap">
      <div class="board-header">
        <div>
          <p class="eyebrow">Calendário</p>
          <h2>${state.currentRole === 'admin' ? 'Planejamento semanal e mensal' : 'Seu calendário de treinos'}</h2>
        </div>
        <button class="primary-button" type="button" data-action="open-plan-dialog">＋ Novo treino</button>
      </div>
      <div class="board-grid">${cards}</div>
      <div class="panel" style="margin-top: 18px;">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Recorrência</p>
            <h2>Treinos mensais</h2>
          </div>
        </div>
        <div class="session-list">${monthlyHtml}</div>
      </div>
    </div>
  `;
}

function renderMessagesPanel() {
  const cards = [
    { title: 'Resumo da semana', summary: 'Seu objetivo principal continua sendo melhorar força e estabilidade do core.', tag: 'Treino' },
    { title: 'Mensagem do treinador', summary: 'Ajustei sua frequência de cardio para terça e quinta, mantendo intensidade moderada.', tag: 'Anotações' },
    { title: 'Checklist do mês', summary: 'Registre hidratação, sono e evolução de dor em cada treino.', tag: 'Meta' }
  ];

  return `
    <div class="content-grid">
      ${cards.map((card) => `
        <div class="message-card">
          <span class="modal-tag">${card.tag}</span>
          <strong>${card.title}</strong>
          <small>${card.summary}</small>
        </div>
      `).join('')}
    </div>
  `;
}

function renderContentPanel() {
  let content = '';

  if (state.currentRole === 'admin') {
    if (state.currentView === 'overview') {
      content = renderClientTable();
    } else if (state.currentView === 'clients') {
      content = renderClientTable();
    } else if (state.currentView === 'plans') {
      content = renderPlanBoard();
    } else {
      content = renderMessagesPanel();
    }
  } else {
    if (state.currentView === 'overview') {
      content = renderClientTable();
    } else if (state.currentView === 'clients') {
      content = renderClientTable();
    } else if (state.currentView === 'plans') {
      content = renderPlanBoard();
    } else {
      content = renderMessagesPanel();
    }
  }

  elements.contentPanel.innerHTML = content;
}

function renderMainGrid() {
  if (state.currentRole === 'admin') {
    elements.mainGrid.innerHTML = renderAdminSchedule();
    return;
  }

  elements.mainGrid.innerHTML = renderClientSchedule();
}

function renderExerciseRows(exercises = []) {
  const list = document.querySelector('#exercise-list');
  if (!list) return;

  if (!exercises.length) {
    list.innerHTML = `
      <div class="exercise-row">
        <label>
          Nome do exercício
          <input type="text" data-field="name" placeholder="Ex.: Agachamento" value="">
        </label>
        <label>
          Peso (kg)
          <input type="number" data-field="weight" min="0" step="0.5" value="0">
        </label>
        <label>
          Repetições
          <input type="number" data-field="reps" min="0" step="1" value="0">
        </label>
        <label>
          Tempo (s)
          <input type="number" data-field="seconds" min="0" step="1" value="0">
        </label>
        <button type="button" class="remove-exercise" aria-label="Remover exercício">×</button>
      </div>
    `;
    return;
  }

  list.innerHTML = exercises.map((exercise) => `
    <div class="exercise-row">
      <label>
        Nome do exercício
        <input type="text" data-field="name" placeholder="Ex.: Agachamento" value="${exercise.name || ''}">
      </label>
      <label>
        Peso (kg)
        <input type="number" data-field="weight" min="0" step="0.5" value="${Number(exercise.weight || 0)}">
      </label>
      <label>
        Repetições
        <input type="number" data-field="reps" min="0" step="1" value="${Number(exercise.reps || 0)}">
      </label>
      <label>
        Tempo (s)
        <input type="number" data-field="seconds" min="0" step="1" value="${Number(exercise.seconds || 0)}">
      </label>
      <button type="button" class="remove-exercise" aria-label="Remover exercício">×</button>
    </div>
  `).join('');

  list.querySelectorAll('.remove-exercise').forEach((button) => {
    button.addEventListener('click', () => {
      button.closest('.exercise-row').remove();
      if (!list.querySelector('.exercise-row')) {
        renderExerciseRows([]);
      }
    });
  });
}

function render() {
  renderAccountHeader();
  renderWelcomeRow();
  renderMetrics();
  renderMainGrid();
  renderContentPanel();
  populatePlanClientOptions();
  syncPlanFormFrequency();
}

function populatePlanClientOptions() {
  const options = clients.map((client) => `
    <option value="${client.id}">${client.name}</option>
  `).join('');

  elements.planClientSelect.innerHTML = options;
  elements.planClientSelect.value = state.currentRole === 'client' ? state.currentClientId : clients[0].id;
}

function syncPlanFormFrequency() {
  const isWeekly = elements.planFrequency.value === 'semanal';
  elements.planDayName.disabled = !isWeekly;
  elements.planDayNumber.disabled = isWeekly;
  elements.planDayName.parentElement.classList.toggle('hidden', !isWeekly);
  elements.planDayNumber.parentElement.classList.toggle('hidden', isWeekly);
}

function normaliseExercises(rows) {
  return rows
    .map((row) => ({
      name: row.querySelector('[data-field="name"]').value.trim(),
      weight: Number(row.querySelector('[data-field="weight"]').value || 0),
      reps: Number(row.querySelector('[data-field="reps"]').value || 0),
      seconds: Number(row.querySelector('[data-field="seconds"]').value || 0)
    }))
    .filter((exercise) => exercise.name || exercise.weight || exercise.reps || exercise.seconds);
}

function openPlanDialog(planId = null) {
  state.editingPlanId = planId;

  if (planId) {
    const plan = trainings.find((item) => item.id === Number(planId));
    if (!plan) return;

    elements.planDialogTitle.textContent = 'Editar treino';
    elements.planClientSelect.value = plan.clientId;
    elements.planFrequency.value = plan.frequency;
    elements.planDayName.value = plan.dayName || 'Segunda';
    elements.planDayNumber.value = plan.dayNumber || 15;
    elements.planForm.title.value = plan.title;
    elements.planForm.category.value = plan.category;
    elements.planForm.time.value = plan.time;
    elements.planForm.duration.value = plan.duration;
    elements.planForm.notes.value = plan.notes || '';
    renderExerciseRows(plan.exercises || []);
  } else {
    elements.planDialogTitle.textContent = 'Novo treino';
    elements.planForm.reset();
    elements.planClientSelect.value = state.currentRole === 'client' ? state.currentClientId : clients[0].id;
    elements.planFrequency.value = 'semanal';
    elements.planDayName.value = 'Segunda';
    elements.planDayNumber.value = 15;
    elements.planForm.time.value = '08:00';
    elements.planForm.duration.value = '45 min';
    elements.planForm.title.value = '';
    renderExerciseRows([
      { name: 'Agachamento', weight: 0, reps: 10, seconds: 0 },
      { name: 'Corrida leve', weight: 0, reps: 0, seconds: 30 }
    ]);
  }

  syncPlanFormFrequency();
  elements.planDialog.showModal();
}

function closePlanDialog() {
  elements.planDialog.close();
  state.editingPlanId = null;
}

function handlePlanSubmit(event) {
  event.preventDefault();

  const formData = new FormData(elements.planForm);
  const exerciseRows = document.querySelectorAll('#exercise-list .exercise-row');
  const payload = {
    clientId: formData.get('clientId'),
    frequency: formData.get('frequency'),
    dayName: formData.get('dayName') || null,
    dayNumber: Number(formData.get('dayNumber')) || null,
    title: formData.get('title'),
    category: formData.get('category'),
    time: formData.get('time'),
    duration: formData.get('duration') || '45 min',
    notes: formData.get('notes') || '',
    exercises: normaliseExercises(exerciseRows)
  };

  if (state.editingPlanId) {
    const index = trainings.findIndex((plan) => plan.id === Number(state.editingPlanId));
    if (index >= 0) {
      trainings[index] = { ...trainings[index], ...payload };
    }
  } else {
    trainings.push({
      id: Date.now(),
      ...payload
    });
  }

  closePlanDialog();
  render();
}

document.querySelectorAll('.switch-button').forEach((button) => {
  button.addEventListener('click', () => {
    state.currentRole = button.dataset.role;
    if (state.currentRole === 'client') {
      state.currentClientId = 'marina';
    }
    state.currentView = 'overview';
    render();
  });
});

document.querySelectorAll('.nav-item[data-view]').forEach((button) => {
  button.addEventListener('click', () => {
    state.currentView = button.dataset.view;
    render();
  });
});

document.addEventListener('click', (event) => {
  const viewAction = event.target.closest('[data-action="open-plan-dialog"]');
  if (viewAction) {
    openPlanDialog();
    return;
  }

  const editButton = event.target.closest('[data-edit-plan]');
  if (editButton) {
    openPlanDialog(editButton.dataset.editPlan);
    return;
  }

  const clientRow = event.target.closest('[data-client-row]');
  if (clientRow) {
    state.currentRole = 'client';
    state.currentClientId = clientRow.dataset.clientRow;
    state.currentView = 'plans';
    render();
    return;
  }
});

document.querySelector('#close-plan-dialog').addEventListener('click', closePlanDialog);
document.querySelector('#cancel-plan-dialog').addEventListener('click', closePlanDialog);
document.querySelector('#add-exercise').addEventListener('click', () => {
  const list = document.querySelector('#exercise-list');
  if (!list) return;

  const row = document.createElement('div');
  row.className = 'exercise-row';
  row.innerHTML = `
    <label>
      Nome do exercício
      <input type="text" data-field="name" placeholder="Ex.: Agachamento" value="">
    </label>
    <label>
      Peso (kg)
      <input type="number" data-field="weight" min="0" step="0.5" value="0">
    </label>
    <label>
      Repetições
      <input type="number" data-field="reps" min="0" step="1" value="0">
    </label>
    <label>
      Tempo (s)
      <input type="number" data-field="seconds" min="0" step="1" value="0">
    </label>
    <button type="button" class="remove-exercise" aria-label="Remover exercício">×</button>
  `;

  row.querySelector('.remove-exercise').addEventListener('click', () => {
    row.remove();
    if (!list.querySelector('.exercise-row')) {
      renderExerciseRows([]);
    }
  });

  list.appendChild(row);
});

elements.planFrequency.addEventListener('change', syncPlanFormFrequency);
elements.planForm.addEventListener('submit', handlePlanSubmit);

renderExerciseRows([
  { name: 'Agachamento', weight: 0, reps: 10, seconds: 0 },
  { name: 'Corrida leve', weight: 0, reps: 0, seconds: 30 }
]);

render();

export const kpiData = {
  recovered: 48500,
  pipeline: 154200,
  rate: 18.5,
}

export const pipelineData = [
  { stage: 'Contatos', count: 1200, fill: 'hsl(var(--chart-1))' },
  { stage: 'Abordados', count: 850, fill: 'hsl(var(--chart-2))' },
  { stage: 'Negociação', count: 320, fill: 'hsl(var(--chart-3))' },
  { stage: 'Agendados', count: 145, fill: 'hsl(var(--chart-4))' },
]

export const hotOpportunities = [
  {
    id: '1',
    patient: 'Maria Silva',
    treatment: 'Implante Total',
    value: 25000,
    status: 'IA aguardando confirmação',
    time: '10 min',
    isWaiting: false,
  },
  {
    id: '2',
    patient: 'Carlos Santos',
    treatment: 'Lente de Contato',
    value: 18000,
    status: 'Dúvida sobre parcelamento',
    time: '22 min',
    isWaiting: false,
  },
  {
    id: '3',
    patient: 'Ana Oliveira',
    treatment: 'Invisalign',
    value: 12000,
    status: 'Pronta para agendar',
    time: '1h',
    isWaiting: false,
  },
  {
    id: '4',
    patient: 'Roberto Alves',
    treatment: 'Prótese Protocolo',
    value: 15500,
    status: 'IA negociando desconto',
    time: '2h',
    isWaiting: false,
  },
  {
    id: '5',
    patient: 'Lucia Costa',
    treatment: 'Facetas',
    value: 20000,
    status: 'Aguardando Humano',
    time: '3h',
    isWaiting: true,
  },
]

export const feedInteractions = [
  {
    id: '1',
    patient: 'Maria Silva',
    treatment: 'Implante Total',
    status: 'active',
    lastMessage:
      'Paciente: Quais as formas de pagamento?\nIA: Podemos parcelar em até 12x sem juros no cartão, Maria. Fica confortável para você?',
  },
  {
    id: '5',
    patient: 'Lucia Costa',
    treatment: 'Facetas',
    status: 'waiting',
    lastMessage:
      'Paciente: O meu caso é um pouco específico, já tive perda óssea.\nIA: Entendo perfeitamente. Vou transferir você para a nossa coordenadora clínica para ela avaliar seu caso com cuidado.',
  },
  {
    id: '6',
    patient: 'João Pedro',
    treatment: 'Avaliação',
    status: 'scheduled',
    lastMessage:
      'IA: Perfeito, João! Sua avaliação está confirmada para amanhã às 14h com o Dr. João. Te esperamos!',
  },
  {
    id: '7',
    patient: 'Fernanda Lima',
    treatment: 'Limpeza',
    status: 'dismissed',
    lastMessage:
      'Paciente: Agora não vou conseguir, obrigada.\nIA: Sem problemas, Fernanda! Estaremos aqui quando precisar.',
  },
]

export const agendaAppointments = [
  {
    id: '101',
    doctor: 'Dr. João',
    time: '09:00',
    duration: 1,
    patient: 'Maria Silva',
    type: 'Avaliação Implante',
    aiGenerated: true,
    details:
      'Agendado após a IA oferecer condição especial de parcelamento no Implante via WhatsApp ontem às 14:30.',
  },
  {
    id: '102',
    doctor: 'Dra. Ana',
    time: '10:00',
    duration: 1,
    patient: 'Carlos Santos',
    type: 'Manutenção',
    aiGenerated: false,
  },
  {
    id: '103',
    doctor: 'Dr. João',
    time: '14:00',
    duration: 2,
    patient: 'Roberto Alves',
    type: 'Cirurgia',
    aiGenerated: false,
  },
  {
    id: '104',
    doctor: 'Dra. Ana',
    time: '15:00',
    duration: 1,
    patient: 'Ana Oliveira',
    type: 'Avaliação Lentes',
    aiGenerated: true,
    details:
      'Reativação de paciente ausente há 18 meses. IA converteu após mostrar casos de sucesso similares do nosso portfólio.',
  },
]
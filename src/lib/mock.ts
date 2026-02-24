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

export type MockMessage = { role: 'patient' | 'ai'; text: string }

export const mockMessages: Record<string, MockMessage[]> = {
  '1': [
    { role: 'ai', text: 'Olá, Maria! Sou a assistente virtual da clínica. Vi que você tem interesse no Implante Total. Posso te ajudar com mais informações?' },
    { role: 'patient', text: 'Oi! Sim, tenho interesse. Mas quero entender melhor os valores.' },
    { role: 'ai', text: 'Claro! O Implante Total começa a partir de R$ 25.000 e inclui todos os procedimentos necessários. Temos ótimas condições de pagamento.' },
    { role: 'patient', text: 'Quais as formas de pagamento?' },
    { role: 'ai', text: 'Podemos parcelar em até 12x sem juros no cartão, Maria. Fica confortável para você?' },
  ],
  '5': [
    { role: 'ai', text: 'Olá, Lucia! Você demonstrou interesse em Facetas Dentárias. Posso te contar mais sobre esse procedimento incrível?' },
    { role: 'patient', text: 'Sim! Mas tenho uma situação particular. Já tive uma perda óssea no passado.' },
    { role: 'ai', text: 'Entendo, Lucia. Casos assim precisam de uma avaliação clínica cuidadosa para garantir o melhor resultado.' },
    { role: 'patient', text: 'O meu caso é um pouco específico, já tive perda óssea.' },
    { role: 'ai', text: 'Entendo perfeitamente. Vou transferir você para a nossa coordenadora clínica para ela avaliar seu caso com cuidado.' },
  ],
  '6': [
    { role: 'ai', text: 'Olá, João Pedro! Que bom ter você por aqui. Gostaria de agendar uma avaliação conosco?' },
    { role: 'patient', text: 'Sim, quero fazer uma avaliação geral.' },
    { role: 'ai', text: 'Ótimo! Temos horários disponíveis amanhã. Prefere manhã ou tarde?' },
    { role: 'patient', text: 'Prefiro à tarde.' },
    { role: 'ai', text: 'Perfeito, João! Sua avaliação está confirmada para amanhã às 14h com o Dr. João. Te esperamos!' },
  ],
  '7': [
    { role: 'ai', text: 'Olá, Fernanda! Notamos que faz algum tempo desde sua última visita. Que tal agendar uma limpeza?' },
    { role: 'patient', text: 'Oi! Até que gostaria, mas estou muito ocupada no momento.' },
    { role: 'ai', text: 'Sem problemas! Podemos encontrar um horário que funcione para você. Quando seria melhor?' },
    { role: 'patient', text: 'Agora não vou conseguir, obrigada.' },
    { role: 'ai', text: 'Sem problemas, Fernanda! Estaremos aqui quando precisar.' },
  ],
}

export type AgendaAppointment = {
  id: string
  doctorId: 'joao' | 'ana'
  doctorName: string
  startTime: string // ISO 8601
  endTime: string   // ISO 8601
  patientName: string
  treatment: string
  aiGenerated: boolean
  details?: string
}

export const agendaAppointments: AgendaAppointment[] = [
  {
    id: '101',
    doctorId: 'joao',
    doctorName: 'Dr. João',
    startTime: '2026-02-23T09:00:00',
    endTime: '2026-02-23T10:00:00',
    patientName: 'Maria Silva',
    treatment: 'Avaliação Implante',
    aiGenerated: true,
    details:
      'Agendado após a IA oferecer condição especial de parcelamento no Implante via WhatsApp ontem às 14:30.',
  },
  {
    id: '102',
    doctorId: 'ana',
    doctorName: 'Dra. Ana',
    startTime: '2026-02-23T10:00:00',
    endTime: '2026-02-23T11:00:00',
    patientName: 'Carlos Santos',
    treatment: 'Manutenção',
    aiGenerated: false,
  },
  {
    id: '103',
    doctorId: 'joao',
    doctorName: 'Dr. João',
    startTime: '2026-02-24T14:00:00',
    endTime: '2026-02-24T16:00:00',
    patientName: 'Roberto Alves',
    treatment: 'Cirurgia Protocolo',
    aiGenerated: false,
  },
  {
    id: '104',
    doctorId: 'ana',
    doctorName: 'Dra. Ana',
    startTime: '2026-02-24T15:00:00',
    endTime: '2026-02-24T16:00:00',
    patientName: 'Ana Oliveira',
    treatment: 'Avaliação Lentes',
    aiGenerated: true,
    details:
      'Reativação de paciente ausente há 18 meses. IA converteu após mostrar casos de sucesso similares do nosso portfólio.',
  },
  {
    id: '105',
    doctorId: 'ana',
    doctorName: 'Dra. Ana',
    startTime: '2026-02-25T10:00:00',
    endTime: '2026-02-25T11:00:00',
    patientName: 'Lucia Costa',
    treatment: 'Avaliação Facetas',
    aiGenerated: true,
    details:
      'Paciente reativada pela IA após 18 meses de ausência. Demonstrou interesse em pacote completo de facetas.',
  },
  {
    id: '106',
    doctorId: 'joao',
    doctorName: 'Dr. João',
    startTime: '2026-02-26T09:00:00',
    endTime: '2026-02-26T10:00:00',
    patientName: 'João Pedro',
    treatment: 'Avaliação Geral',
    aiGenerated: false,
  },
  {
    id: '107',
    doctorId: 'ana',
    doctorName: 'Dra. Ana',
    startTime: '2026-02-27T11:00:00',
    endTime: '2026-02-27T12:00:00',
    patientName: 'Fernanda Lima',
    treatment: 'Limpeza e Check-up',
    aiGenerated: false,
  },
  {
    id: '108',
    doctorId: 'joao',
    doctorName: 'Dr. João',
    startTime: '2026-02-28T09:30:00',
    endTime: '2026-02-28T10:30:00',
    patientName: 'Pedro Henrique',
    treatment: 'Implante Unitário',
    aiGenerated: true,
    details:
      'IA fechou agendamento após oferecer desconto progressivo. Paciente estava em dúvida entre duas clínicas.',
  },
]
import { useMemo, useState } from 'react'

type CadernoKey = '1' | '2' | '3' | '4' | '5'

type Item = {
  id: number
  caderno: CadernoKey
  categoria?: string
  unidade?: string
  titulo: string
  original: string
  simples: string
  pagina: string
  destaque: string
}

const edicoes = [
  { data: '2026-07-21', label: '21/07/2026', edicao: '4080' },
  { data: '2026-07-20', label: '20/07/2026', edicao: '4079' },
  { data: '2026-07-17', label: '17/07/2026', edicao: '4078' },
  { data: '2026-07-16', label: '16/07/2026', edicao: '4077' },
]

const unidades = [
  'Todas as unidades',
  '1ª Vara Criminal de Salvador',
  '2ª Vara de Família de Feira de Santana',
  '5ª Vara Cível de Vitória da Conquista',
  '2ª Câmara Cível',
  'Turma Recursal',
]

const itens: Item[] = [
  {
    id: 1,
    caderno: '1',
    categoria: 'Normas',
    titulo: 'Portaria sobre expediente interno',
    original: 'Dispõe sobre ajuste no expediente administrativo de unidades do tribunal.',
    simples: 'O tribunal alterou regras internas de expediente. A medida organiza o funcionamento administrativo das unidades indicadas.',
    pagina: 'p. 3',
    destaque: 'Mudança administrativa',
  },
  {
    id: 2,
    caderno: '1',
    categoria: 'Nomeações e exonerações',
    titulo: 'Nomeação para cargo em comissão',
    original: 'Fica nomeado servidor para exercer cargo em comissão, com efeitos a partir da publicação.',
    simples: 'O tribunal nomeou um servidor para cargo em comissão. A nomeação começa a valer a partir desta publicação.',
    pagina: 'p. 7',
    destaque: 'Ato de pessoal',
  },
  {
    id: 3,
    caderno: '1',
    categoria: 'Contratos e licitações',
    titulo: 'Extrato de contrato de suporte técnico',
    original: 'Extrato contratual para prestação de suporte técnico e manutenção.',
    simples: 'O tribunal publicou resumo de contrato para suporte técnico e manutenção de serviço.',
    pagina: 'p. 11',
    destaque: 'Contrato publicado',
  },
  {
    id: 4,
    caderno: '1',
    categoria: 'Concursos',
    titulo: 'Edital de convocação',
    original: 'Convoca candidatos aprovados para etapa seguinte do certame.',
    simples: 'O tribunal convocou candidatos aprovados para a próxima fase do concurso.',
    pagina: 'p. 15',
    destaque: 'Concurso em andamento',
  },
  {
    id: 5,
    caderno: '2',
    unidade: '2ª Câmara Cível',
    titulo: 'Pauta de julgamento virtual',
    original: 'Publicação de processos incluídos em sessão virtual da câmara.',
    simples: 'A câmara divulgou a lista de processos que serão julgados em sessão virtual.',
    pagina: 'p. 4',
    destaque: 'Julgamento agendado',
  },
  {
    id: 6,
    caderno: '3',
    unidade: '1ª Vara Criminal de Salvador',
    titulo: 'Intimação processual',
    original: 'Intimam-se as partes para manifestação no prazo legal.',
    simples: 'As partes foram chamadas para se manifestar dentro do prazo previsto em lei.',
    pagina: 'p. 29',
    destaque: 'Prazo em curso',
  },
  {
    id: 7,
    caderno: '4',
    unidade: '2ª Vara de Família de Feira de Santana',
    titulo: 'Despacho em ação de família',
    original: 'Determina providência processual e ciência das partes.',
    simples: 'O juízo determinou uma providência no processo e mandou dar ciência às partes.',
    pagina: 'p. 18',
    destaque: 'Andamento processual',
  },
  {
    id: 8,
    caderno: '5',
    unidade: '5ª Vara Cível de Vitória da Conquista',
    titulo: 'Edital de intimação',
    original: 'Ficam intimadas as partes interessadas na forma da publicação.',
    simples: 'As pessoas interessadas foram intimadas por meio desta publicação oficial.',
    pagina: 'p. 42',
    destaque: 'Intimação por edital',
  },
]

const tabs: { key: CadernoKey; label: string; subtitulo: string }[] = [
  { key: '1', label: 'Caderno 1', subtitulo: 'Administrativo' },
  { key: '2', label: 'Caderno 2', subtitulo: 'Órgãos Judicantes de 2º Grau' },
  { key: '3', label: 'Caderno 3', subtitulo: 'Entrância Final' },
  { key: '4', label: 'Caderno 4', subtitulo: 'Entrância Intermediária' },
  { key: '5', label: 'Caderno 5', subtitulo: 'Entrância Inicial' },
]

const categorias = ['Todas', 'Normas', 'Nomeações e exonerações', 'Contratos e licitações', 'Concursos']

export default function App() {
  const [caderno, setCaderno] = useState<CadernoKey>('1')
  const [data, setData] = useState(edicoes[0].data)
  const [categoria, setCategoria] = useState('Todas')
  const [unidade, setUnidade] = useState('Todas as unidades')
  const [selecionado, setSelecionado] = useState<Item | null>(itens[0])

  const edicaoAtual = edicoes.find((item) => item.data === data) ?? edicoes[0]

  const filtrados = useMemo(() => {
    return itens.filter((item) => {
      if (item.caderno !== caderno) return false
      if (caderno === '1' && categoria !== 'Todas' && item.categoria !== categoria) return false
      if (caderno !== '1' && unidade !== 'Todas as unidades' && item.unidade !== unidade) return false
      return true
    })
  }, [caderno, categoria, unidade])

  const resumo = useMemo(() => {
    if (caderno === '1') {
      return 'Leitura simplificada dos atos administrativos do DJE com foco em normas, pessoal, contratos e concursos.'
    }
    return 'Leitura simplificada por unidade judicial, com seleção rápida para localizar a vara ou órgão desejado.'
  }, [caderno])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <rect x="8" y="8" width="32" height="32" rx="10" stroke="currentColor" strokeWidth="3" />
              <path d="M17 18h14M17 24h14M17 30h8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h1>Leitura Simples DJE</h1>
            <p>TJBA em linguagem clara</p>
          </div>
        </div>

        <nav className="side-nav" aria-label="Navegação principal">
          <button className="nav-item active">Painel do diário</button>
          <button className="nav-item">Resumo por caderno</button>
          <button className="nav-item">Unidades judiciais</button>
          <button className="nav-item">Favoritos</button>
        </nav>

        <div className="side-card">
          <span className="eyebrow">Modo MVP</span>
          <h2>Pronto para Netlify</h2>
          <p>Este protótipo já está preparado para publicação rápida no GitHub e deploy automático.</p>
        </div>
      </aside>

      <div className="content-area">
        <header className="topbar">
          <div>
            <p className="eyebrow">Diário oficial consultado</p>
            <h2>Edição {edicaoAtual.edicao}</h2>
          </div>
          <div className="toolbar">
            <label className="field compact">
              <span>Data da edição</span>
              <select value={data} onChange={(e) => setData(e.target.value)}>
                {edicoes.map((item) => (
                  <option key={item.data} value={item.data}>{item.label}</option>
                ))}
              </select>
            </label>
            <button className="primary-btn">Consultar diário</button>
          </div>
        </header>

        <main className="main-grid">
          <section className="panel hero-panel">
            <div>
              <p className="eyebrow">Leitura simplificada</p>
              <h3>Consulta rápida por caderno, categoria e unidade</h3>
              <p>{resumo}</p>
            </div>
            <div className="hero-stats">
              <div>
                <strong>5</strong>
                <span>Cadernos</span>
              </div>
              <div>
                <strong>1 clique</strong>
                <span>Para trocar a data</span>
              </div>
              <div>
                <strong>{filtrados.length}</strong>
                <span>Itens visíveis</span>
              </div>
            </div>
          </section>

          <section className="panel controls-panel">
            <div className="tabs" role="tablist" aria-label="Cadernos">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={tab.key === caderno ? 'tab active' : 'tab'}
                  onClick={() => {
                    setCaderno(tab.key)
                    setCategoria('Todas')
                    setUnidade('Todas as unidades')
                    setSelecionado(null)
                  }}
                >
                  <span>{tab.label}</span>
                  <small>{tab.subtitulo}</small>
                </button>
              ))}
            </div>

            <div className="filters-row">
              {caderno === '1' ? (
                <label className="field">
                  <span>Categoria</span>
                  <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                    {categorias.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </label>
              ) : (
                <label className="field grow">
                  <span>Vara ou unidade</span>
                  <select value={unidade} onChange={(e) => setUnidade(e.target.value)}>
                    {unidades.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </label>
              )}

              <div className="meta-box">
                <span className="eyebrow">Filtro ativo</span>
                <strong>{caderno === '1' ? categoria : unidade}</strong>
              </div>
            </div>
          </section>

          <section className="panel list-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Publicações</p>
                <h3>Resultados organizados</h3>
              </div>
              <span className="pill">{filtrados.length} itens</span>
            </div>

            <div className="cards-grid">
              {filtrados.map((item) => (
                <button key={item.id} className="entry-card" onClick={() => setSelecionado(item)}>
                  <div className="entry-top">
                    <span className="pill soft">{item.destaque}</span>
                    <span className="page-tag">{item.pagina}</span>
                  </div>
                  <h4>{item.titulo}</h4>
                  <p>{item.simples}</p>
                  <div className="entry-meta">
                    <span>{item.categoria ?? item.unidade}</span>
                    <span>Abrir detalhe</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="panel detail-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Detalhe</p>
                <h3>Texto oficial e versão simples</h3>
              </div>
            </div>

            {selecionado ? (
              <div className="detail-body">
                <div className="detail-block highlight">
                  <span className="eyebrow">Explicação simples</span>
                  <h4>{selecionado.titulo}</h4>
                  <p>{selecionado.simples}</p>
                </div>
                <div className="detail-block">
                  <span className="eyebrow">Texto oficial</span>
                  <p>{selecionado.original}</p>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <h4>Selecione uma publicação</h4>
                <p>Ao clicar em um card, o sistema mostra o texto oficial e a explicação em linguagem simples.</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

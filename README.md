# Cantina Conecta

Aplicativo mobile que digitaliza o caderninho usado em cantinas escolares para
registrar os lanches das crianças. Responsáveis acompanham o que os filhos
consomem, adicionam créditos, definem limites de gasto e agendam lanches; o dono
da cantina gerencia estoque, registra vendas e publica avisos.

## Contexto

Trabalho final da disciplina de **Computação Móvel**, desenvolvido em dupla em
2024 e concluído posteriormente.

- [Catherine Bezerra Markert](https://github.com/cathmarkert) — telas, design e
  fluxo do responsável
- [Yago Costa Oliveira](https://github.com/YagoOliveira852) — navegação, backend
  e integração

<!--
Screenshots: adicione aqui 3 ou 4 capturas dos dois fluxos (responsável e dono).
Rode o app no Expo Go, tire os prints, salve em docs/screenshots/ e referencie
com: ![Tela inicial](docs/screenshots/home.png)
-->

## Funcionalidades

**Responsável**
- Cadastro, login e sessão
- Cadastro de dependentes com matrícula e permissão de lanche avulso
- Limite de gasto por dependente
- Adição de créditos
- Agendamento de lanches: escolhe dependente, horário de entrega e monta o pedido
- Extrato unificado de créditos e consumo, e histórico por dependente
- Avisos publicados pela cantina

**Dono da cantina**
- Cadastro de produtos com preço, quantidade e marcação de lactose/glúten
- Venda no balcão vinculada a um dependente, debitada do responsável
- Lista de pedidos agendados
- Extrato de todas as compras, por aluno e responsável
- Publicação de avisos

## Stack

| Camada | Tecnologias |
|---|---|
| App | React Native (Expo 51), React Navigation, React Native Paper |
| API | Flask, SQLAlchemy, Flask-Session, Flask-Migrate |
| Banco | SQLite |

## Arquitetura

```
CantinaConecta/src
├── routes/      navegação: stacks e tabs separadas por perfil de usuário
├── screens/     19 telas
├── components/  headers reutilizáveis por rota
├── services/    api.js — camada única de acesso à API
└── stylesScreen/, stylesComponents/

backend
├── app.py       configuração e registro dos blueprints
├── models.py    Usuario, Dependente, Estoque, Pedido, ItemPedido, Recarga, Aviso
├── security.py  login_required, owner_required e checagem de posse
├── auth.py      registro, login e logout
├── routes.py    perfil, dependentes e créditos
├── cantina.py   estoque e avisos
└── pedidos.py   compras, extratos e resumos
```

A navegação é o ponto central do app: o login decide, pela resposta da API, se o
usuário entra na árvore do responsável ou na do dono, cada uma com sua própria
composição de tabs e stacks aninhadas.

No backend, toda compra — agendada ou de balcão — passa pela mesma função, que
valida estoque, saldo e limite antes de gravar e aplica todos os efeitos (débito
do crédito, baixa do estoque, atualização do gasto) numa única transação.

## Como rodar

Requer Python 3.10+, Node 18+ e o app Expo Go no celular.

**Backend**

```bash
cd backend
python -m venv venv
source venv/Scripts/activate   # Linux/macOS: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env           # opcional: define a SECRET_KEY
python app.py
```

A API sobe em `http://0.0.0.0:8082` e cria o banco automaticamente na primeira
execução.

**App**

```bash
cd CantinaConecta
npm install
```

Crie um arquivo `.env` apontando para o IP da sua máquina na rede local — o
celular precisa alcançar o backend, então `localhost` não funciona:

```
API_URL=http://192.168.0.10:8082
```

```bash
npx expo start
```

Leia o QR code com o Expo Go.

> Para testar o fluxo completo, registre duas contas: uma marcando "Registrar
> como Dono" e outra como responsável. O dono precisa cadastrar produtos no
> estoque antes que o responsável consiga montar um pedido.

## Estado do projeto

Os dois fluxos funcionam de ponta a ponta contra a API, sem dados fictícios.

Ficou de fora:

- **Ciclo de status do pedido** (pendente / pronto / cancelado). Hoje o pedido é
  criado e listado, mas não muda de estado nem pode ser cancelado.
- **Integração de pagamento.** Os botões de PIX e cartão representam a escolha do
  meio e creditam o valor direto; não há gateway.
- **Testes automatizados.** A verificação do backend foi feita manualmente,
  cobrindo autorização, regras de compra e rollback.

## Decisões e aprendizados

**Autenticação por sessão.** A API usa sessão via cookie (Flask-Session), que
funciona no app porque o React Native mantém um cookie jar nativo. Num app mobile
o idiomático seria um token guardado no dispositivo, que sobrevive a reinícios do
servidor e escala horizontalmente sem estado compartilhado. A sessão foi mantida
porque já estava em pé e a troca exigiria refazer a chamada de API em todas as
telas — mas é a primeira coisa que eu mudaria hoje.

**Autorização é responsabilidade do servidor.** A primeira versão da API confiava
no ID que vinha na URL: qualquer conta autenticada conseguia remover ou alterar o
dependente de outra família só trocando o número, e um responsável comum podia
mexer no estoque da cantina. Esconder o botão na interface não protege nada —
hoje toda rota passa por um decorator e as que recebem um ID verificam a posse do
recurso.

**Dinheiro não é texto, nem float.** O modelo inicial guardava valores como
`String`, o que impedia somar ou ordenar. A migração para `Numeric` trouxe à tona
um erro clássico: somar `float` com `Decimal` levanta `TypeError` em Python, e a
adição de crédito quebrava com qualquer valor quebrado — "R$ 10" passava, "R$
10,50" não.

**Merge é parte do trabalho.** Dividimos as tarefas em branches por pessoa e por
tema, o que funcionou bem durante o desenvolvimento. O que faltou foi fechar o
ciclo: as duas últimas semanas de trabalho ficaram paradas em três branches nunca
mergeadas, e a `main` — a única coisa que alguém vê ao abrir o repositório —
representava pouco mais da metade do que tinha sido construído. Uma das branches
era ainda uma arquitetura concorrente, com banco local no dispositivo, que teria
apagado o backend inteiro se fosse mergeada. Branch que não volta para a `main`
não é trabalho entregue.

## Licença

MIT. Veja [LICENSE](LICENSE).

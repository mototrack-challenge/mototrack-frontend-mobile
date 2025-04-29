# MotoTrack 📱

**MotoTrack** é uma aplicação mobile desenvolvida em React Native com Expo, criada como parte de um desafio acadêmico em parceria com a empresa **Mottu**. A solução tem como objetivo facilitar a **gestão e organização de motos** nos pátios da empresa, permitindo cadastro, movimentação e visualização das motos de forma eficiente e intuitiva.

---

## 👥 Integrantes

- **Felipe Ulson Sora** – RM555462 – [@felipesora](https://github.com/felipesora)
- **Augusto Lope Lyra** – RM558209 – [@lopeslyra10](https://github.com/lopeslyra10)
- **Vinicius Ribeiro Nery Costa** – RM559165 – [@ViniciusRibeiroNery](https://github.com/ViniciusRibeiroNery)

---

## 🚀 Descrição da Solução

O aplicativo permite:
- Cadastro de motos com modelo, placa, status e departamento inicial.
- Visualização das motos por departamento.
- Histórico de movimentações (departamento + data/hora).
- Edição, remoção e movimentação de motos entre departamentos.
- Armazenamento local temporário com **AsyncStorage** (sem backend por enquanto).

---

## 📱 Páginas do App

- **Login/Cadastro:** Tela inicial do usuário.
- **Home:** Página principal com cards mostrando o total de motos cadastradas e quantas estão em cada departamento.
- **Cadastro de Motos:** Formulário para adicionar nova moto ao sistema.
- **Lista de Motos:** Exibição de todas as motos cadastradas com:
  - Detalhes da moto (modelo, placa, status, departamento atual)
  - Histórico de movimentações
  - Botões para editar, mover de departamento ou deletar a moto

---

## 🛠️ Como rodar o projeto localmente

### Pré-requisitos
- Node.js instalado
- Expo CLI instalada (caso não tenha, instale com `npm install -g expo-cli`)
- Um emulador Android/iOS rodando ou o app **Expo Go** no celular

### Passos:

```bash
# Clone o repositório
git clone https://github.com/mototrack-challenge/mototrack-frontend.git

# Acesse a pasta do projeto
cd mototrack-frontend

# Instale as dependências
npm install

# Inicie o projeto com Expo
npx expo start

```
- Um QR Code será gerado no terminal.

- Use o app Expo Go no seu celular para escanear o QR Code e visualizar o app.

- Se estiver em um emulador, selecione a opção desejada no navegador (Android/iOS/Web).

---

## 🧰 Tecnologias utilizadas

- React Native

- Expo

- TypeScript

- AsyncStorage

- React Navigation

---

## 🎨 Links do Figma

- [Protótipo no Figma](https://www.figma.com/proto/8i4XiCi16s1NIJUHwOXBH7/MotoTrack?node-id=1-3&p=f&t=IE8DNYqiGsRNgN80-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3)

- [Design no Figma](https://www.figma.com/design/8i4XiCi16s1NIJUHwOXBH7/MotoTrack?node-id=0-1&p=f&t=HSyQYs87hWQccr5O-0)

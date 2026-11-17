# Ana Carol — Clínica Veterinária & Pet Shop

Site institucional responsivo para as unidades Ponta da Praia e Boqueirão, em Santos/SP.

## Recursos

- Apresentação de serviços: atendimento veterinário, banho e tosa, higiene bucal, produtos para pets, táxi dog e hotelzinho.
- WhatsApp individual de cada unidade e mensagens específicas por serviço.
- Formulário que prepara uma conversa no WhatsApp, sem armazenar dados.
- Endereços, horários, links para rotas e Instagram.
- Menu para celular, perguntas frequentes e navegação acessível.

## Executar localmente

Site estático em HTML, CSS e JavaScript, sem etapa de compilação.

```sh
python -m http.server 8000
```

Abra http://localhost:8000. Os arquivos da raiz também podem ser publicados em uma hospedagem estática.

## Arquivos

- `index.html`: conteúdo e estrutura.
- `styles.css`: identidade visual e adaptação para diferentes telas.
- `app.js`: menu, escolha de unidade e mensagens do WhatsApp.
- `assets/`: logo e imagens.

## Conteúdo

Logo fornecido pelo solicitante e fotografias do site existente da Ana Carol. Endereços e contatos consultados em https://www.anacarolpet.com.br/contato.php. A referência a 2003 vem de https://anacarolpet.com.br/pet.php.

As mensagens são abertas no WhatsApp; os agendamentos dependem de confirmação da equipe. Os dados comerciais podem ser atualizados em `index.html` e `app.js`.

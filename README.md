# Padrão Fidalgo
Projecto front-end académico para a empresa Padrão Fidalgo.

Aplicação web de gestão de encomendas do comércio por grosso de carne e produtos à base de carne. Esta parte da necessidade dos clientes efecturarem encomendas escolhendo a data de entrega, o produto e a quantidade que quer comprar.

A aplicação contém dois tipos de perfis:

* Admin: o administrador do site, fornece os produtos e o feedback das encomendas efectuadas dos clientes. 
* User: utilizador que cria as encomendas.

E comporta as seguintes funcionalidades:

* Login
* Registo para os utilizadores (o admin só pode ser criado directamente com um pedido à API)
* Criação de uma nova encomenda (descrevendo as quantidades, data de entrega)
* Provisionamento da encomenda. O cliente pode ver as suas encomendas e verificar o estado da sua encomenda.
    * Uma encomenda pode estar nos estados: Pendente, Validada, Em Curso, Entregue, Finalizada.
    * Só o admin consegue alterar o estado de uma encomenda.
* Panel de administração que só o utilizador do tipo admin consegue ver que pode:
    * Listar/Criar/Atualizar/Apagar as encoemndas.
    * Listar/Criar/Atualizar/Apagar os produtos.
    * Listar/Atualizar/Apagar os utilizadores.
* Listar os produtos com os respectivos campos.
* Listar as encomendas do utilizador autenticado. 
* Utilizador não autenticado só poderá ver a página Home.

# Tecnologias 

Para o desenvolvimento do frontend foi utilizado a framework Vue.js.

# Wireframes

Foi utilizado a versão trial do programa Balsamiq para criação dos wireframes. Estão disponíveis na pasta Wireframes localizado neste projeto.

# Template

Os template foram implementados com base nos UX do projeto Animalec, que foi estudado ao longo desta uc.

# Using json-server 
To mock some dummy results
https://github.com/typicode/json-server

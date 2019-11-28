# Conceito
A ideia do projeto é fazer track de medicamentos, buscando associar o remédio a um receita médica.

# Como funciona?
Receitas médicas são geradas após visitas de pacientes aos hospitais. Uma receita contém pedido para um ou mais medicamentos, um valor identificador, uma identificação do médico que a gerou e do hospital gerador. O paciente ao fazer a visita a farmácia e realizar a compra do medicamento, esse medicamento passa a estar relacionada a esse receita. Um medicamento possui como atributos fabricante, ID, data de fabricação e validade e holder (farmácia (ID) ou se foi vendido) e um receita a qual ira se associar.

# Nossa arquitetura
Nossa hyperledger fabric network possui 1 canal e 2 organizaçãos, uma delas responsável pelo conjunto de farmácias e outra pelos hospitais. Cada organização possui 2 Peers (peer0.org1, peer1.org1 e peer0.org2, peer1.org2), sendo o peer0 de cada organização o Anchor (responsável por comunicar por meio do canal com os outros peers das demais orgs). Além disso, nosso chaincode engloba como mais de um Asset, receitas e medicamentos.

A organização das Farmacias é responsável por gravar na rede dados sobre os medicamentos que podem ser vendidos por elas (ou seja, medicamentos que estão em estoque) e por associar o medicamento vendido pela Farmacia X da Org a uma Receita Médica. Já a organização dos Hospitais é responsável por gerar Receitas Médicas com pedidos de medicamentos.

# Arquitetura ideal
Uma network onde cada Organização representa um único hospital, farmácia e/ou fabricante. Dessa forma, a responsabilidade por registro dos medicamentos passa a ser do fabricante e não da farmácia. Cada Organização pode decidir o número de Peers que deseja ter. O chaincode (Smart Contract) deve ser divido, criando mais chaincodes e possivelmente mais Ledger, deixando um reponsavel pelas Receitas e outro pelos Medicamentos.

# Como usar?
Após clonar o repositóiro e estar no diretorio raiz do projeto:

```
cd med-app
./startFabric.sh
node enrollAdmin
node registerUser
```

Para testes no próprio terminal, sem utilizar a interface web:

```
node invoke
node query
```
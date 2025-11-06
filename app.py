from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# -------------------------------------------------------------
# CONFIGURAÇÃO DO BANCO DE DADOS
# -------------------------------------------------------------
def get_db_connection():
    return mysql.connector.connect(
        host="127.0.0.234",     
        port=3306,                     
        user="root",            
        password="G00d$$171",
        database="BDALLDEV"       
    )

# -------------------------------------------------------------
# ROTA DE TESTE
# -------------------------------------------------------------
@app.route('/')
def home():
    return jsonify({"status": "Queres neste mundo ser um vencedor..."})

# -------------------- ROTAS GERAIS --------------------------
def executar_select(query, params=None):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute(query, params or ())
    result = cursor.fetchall()
    cursor.close()
    db.close()
    return result

def executar_insert(query, params):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute(query, params)
    db.commit()
    cursor.close()
    db.close()

# -------------------- USUÁRIOS ------------------------------
@app.route('/usuario', methods=['GET'])
def listar_usuarios():
    return jsonify(executar_select("SELECT * FROM usuario"))

@app.route('/usuario', methods=['POST'])
def cadastrar_usuario():
    data = request.json
    executar_insert(
        "INSERT INTO usuario (nome, email, senha, cargo) VALUES (%s, %s, %s, %s)",
        (data['nome'], data['email'], data['senha'], data['cargo'])
    )
    return jsonify({"message": "Usuário cadastrado com sucesso!"}), 201

# -------------------- CLIENTES ------------------------------
@app.route('/cliente', methods=['GET'])
def listar_clientes():
    return jsonify(executar_select("SELECT * FROM cliente"))

@app.route('/cliente', methods=['POST'])
def cadastrar_cliente():
    data = request.json
    executar_insert(
        "INSERT INTO cliente (nome, email, telefone, endereco) VALUES (%s, %s, %s, %s)",
        (data['nome'], data['email'], data['telefone'], data['endereco'])
    )
    return jsonify({"message": "Cliente cadastrado com sucesso!"}), 201

# -------------------- CATEGORIAS ---------------------------
@app.route('/categoria', methods=['GET'])
def listar_categorias():
    return jsonify(executar_select("SELECT * FROM categoria"))

@app.route('/categoria', methods=['POST'])
def cadastrar_categoria():
    data = request.json
    executar_insert(
        "INSERT INTO categoria (nome) VALUES (%s)",
        (data['nome'],)
    )
    return jsonify({"message": "Categoria cadastrada com sucesso!"}), 201

# -------------------- PRODUTOS -----------------------------
@app.route('/produto', methods=['GET'])
def listar_produtos():
    return jsonify(executar_select("SELECT * FROM produtos"))

@app.route('/produto', methods=['POST'])
def cadastrar_produto():
    data = request.json
    executar_insert(
        "INSERT INTO produto (nome, categoria_id, preco, estoque_id) VALUES (%s, %s, %s, %s)",
        (data['nome'], data['categoria_id'], data['preco'], data['estoque_id'])
    )
    return jsonify({"message": "Produto cadastrado com sucesso!"}), 201

# -------------------- FORNECEDORES -------------------------
@app.route('/fornecedor', methods=['GET'])
def listar_fornecedores():
    return jsonify(executar_select("SELECT * FROM fornecedores"))

@app.route('/fornecedor', methods=['POST'])
def cadastrar_fornecedor():
    data = request.json
    executar_insert(
        "INSERT INTO fornecedores (razao_social, cnpj, email, telefone) VALUES (%s, %s, %s, %s)",
        (data['razao_social'], data['cnpj'], data['email'], data['telefone'])
    )
    return jsonify({"message": "Fornecedor cadastrado com sucesso!"}), 201

# -------------------- MATERIAIS ----------------------------
@app.route('/material', methods=['GET'])
def listar_materiais():
    return jsonify(executar_select("SELECT * FROM material"))

@app.route('/material', methods=['POST'])
def cadastrar_material():
    data = request.json
    executar_insert(
        "INSERT INTO material (nome, fornecedor_id, categoria_id) VALUES (%s, %s, %s)",
        (data['nome'], data['fornecedor_id'], data['categoria_id'])
    )
    return jsonify({"message": "Material cadastrado com sucesso!"}), 201

# -------------------- ESTOQUE -----------------------------
@app.route('/estoque', methods=['GET'])
def listar_estoque():
    return jsonify(executar_select("SELECT * FROM estoque"))

@app.route('/estoque', methods=['POST'])
def cadastrar_estoque():
    data = request.json
    executar_insert(
        "INSERT INTO estoque (produto_id, quantidade) VALUES (%s, %s)",
        (data['produto_id'], data['quantidade'])
    )
    return jsonify({"message": "Estoque cadastrado com sucesso!"}), 201

# -------------------- PEDIDO ------------------------------
@app.route('/pedido', methods=['GET'])
def listar_pedidos():
    return jsonify(executar_select("SELECT * FROM pedido"))

@app.route('/pedido', methods=['POST'])
def cadastrar_pedido():
    data = request.json
    executar_insert(
        "INSERT INTO pedido (cliente_id, data, status, desconto, total) VALUES (%s, %s, %s, %s, %s)",
        (data['cliente_id'], data['data'], data['status'], data['desconto'], data['total'])
    )
    # Capturar ID do pedido recém criado
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT LAST_INSERT_ID()")
    pedido_id = cursor.fetchone()[0]
    # Inserir itens do pedido
    for item in data['itens']:
        cursor.execute(
            "INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (%s, %s, %s, %s)",
            (pedido_id, item['produto_id'], item['quantidade'], item['preco_unitario'])
        )
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"message": "Pedido cadastrado com sucesso!"}), 201

if __name__ == "__main__":
    app.run(debug=True)


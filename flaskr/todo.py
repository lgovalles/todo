from flask import Flask, render_template

app = Flask(__name__)

# Routes app
@app.route('/')
def login():
    return render_template('login.html')


@app.route('/home')
def home():
    return render_template('home.html')


@app.route('/todo')
def addTodo():
    return render_template('todo.html')


if __name__ == '__main__':
    app.run(debug=True)

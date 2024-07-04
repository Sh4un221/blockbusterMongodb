import { MongoClient } from 'mongodb';

export default class DatabaseConnection {
  constructor(uri) {
    this.client = new MongoClient(uri);
    this.db = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db('m2');
      console.log('Conectado a la base de datos');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
  }

  async close() {
    await this.client.close();
    console.log('Conexión cerrada');
  }

  getDb() {
    return this.db;
  }
}
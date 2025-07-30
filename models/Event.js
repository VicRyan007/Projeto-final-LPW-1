const db = require('../db/connection');

class Event {
  static createTable() {
    return new Promise((resolve, reject) => {
      const sql = `
        CREATE TABLE IF NOT EXISTS events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          city TEXT NOT NULL,
          title TEXT NOT NULL,
          date TEXT,
          time TEXT,
          location TEXT NOT NULL,
          description TEXT,
          type TEXT NOT NULL CHECK(type IN ('cultura', 'leilao', 'show', 'workshop'))
        )
      `;
      
      db.run(sql, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static findAll(options = {}) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM events';
      const params = [];
      
      if (options.where) {
        const conditions = [];
        
        if (options.where.type) {
          conditions.push('type = ?');
          params.push(options.where.type);
        }
        
        if (options.where.city) {
          conditions.push('city = ?');
          params.push(options.where.city);
        }
        
        if (conditions.length > 0) {
          sql += ' WHERE ' + conditions.join(' AND ');
        }
      }
      
      if (options.order) {
        sql += ' ORDER BY ' + options.order.map(order => {
          const [field, direction] = Array.isArray(order) ? order : [order, 'ASC'];
          return `${field} ${direction}`;
        }).join(', ');
      }
      
      db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static findDistinctCities(type) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT DISTINCT city FROM events WHERE type = ? ORDER BY city';
      
      db.all(sql, [type], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map(row => row.city));
        }
      });
    });
  }

  static create(eventData) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO events (city, title, date, time, location, description, type)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      const params = [
        eventData.city,
        eventData.title,
        eventData.date,
        eventData.time,
        eventData.location,
        eventData.description,
        eventData.type
      ];
      
      db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...eventData });
        }
      });
    });
  }

  static bulkCreate(events) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO events (city, title, date, time, location, description, type)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      db.serialize(() => {
        const stmt = db.prepare(sql);
        
        events.forEach(event => {
          stmt.run([
            event.city,
            event.title,
            event.date,
            event.time,
            event.location,
            event.description,
            event.type
          ]);
        });
        
        stmt.finalize((err) => {
          if (err) {
            reject(err);
          } else {
            resolve(events);
          }
        });
      });
    });
  }

  static destroy(options = {}) {
    return new Promise((resolve, reject) => {
      let sql = 'DELETE FROM events';
      const params = [];
      
      if (options.where) {
        const conditions = [];
        
        if (options.where.type) {
          conditions.push('type = ?');
          params.push(options.where.type);
        }
        
        if (conditions.length > 0) {
          sql += ' WHERE ' + conditions.join(' AND ');
        }
      }
      
      db.run(sql, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = Event;

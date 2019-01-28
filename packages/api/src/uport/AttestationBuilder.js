class AttestationBuilder {
  constructor() {
    this.values = {};
  }
  
  addOne(key, value) {
    if (!this.values[key]) {
      this.values[key] = [];
    }
    if (this.values[key].find(stored => stored === value)) {
      return; // Same value already present
    }
    this.values[key].push(value);
  }

  addMany(keyValues = {}) {
    Object.entries(keyValues).forEach(([key, values]) => {
      values.forEach((value) => {
        this.addOne(key, value);
      });
    });
  }
}

module.exports = AttestationBuilder;

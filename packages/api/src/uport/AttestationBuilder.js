class AttestationBuilder {
  constructor() {
    this.values = {};
  }
  
  addOne(key, value) {
    value = String(value);
    if (!this.values[key]) {
      this.values[key] = [];
    }
    if (this.values[key].find(stored => stored === value)) {
      return this; // Same value already present
    }
    this.values[key].push(value);

    return this;
  }

  addMany(keyValues = {}) {
    Object.entries(keyValues).forEach(([key, values]) => {
      values.forEach((value) => {
        this.addOne(key, value);
      });
    });

    return this;
  }
}

module.exports = AttestationBuilder;

const Producer = require('./producer')

class Province {
  constructor(doc) {
    this._name = doc.name
    this._producers = []
    this._totalProdunction = 0
    this._demand = doc.demand
    this._price = doc.price
    doc.producers.forEach(d => this.addProducer(new Producer(this, d)))
  }

  addProducer(arg) {
    this._producers.push(arg)
    this._totalProdunction += arg.production
  }

  get name() { return this._name }
  get producers() { return this._producers }
  get totalProduction() { return this._totalProdunction }
  set totalProduction(arg) { this._totalProdunction = arg }
  get demand() { return this._demand }
  set demand(arg) { this._demand = Number.parseInt(arg) }
  get price() { return this._price }
  set price(arg) { this._price = Number.parseInt(arg) }

  // 생산 부족분을 계산하는 함수
  get shortfall() {
    return this._demand - this.totalProduction
  }

  // 수익을 계산하는 함수
  get profit() {
    return this.demandValue - this.demandCost
  }

  get demandValue() {
    return this.satisfiedDemand * this.price
  }

  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction)
  }

  get demandCost() {
    let remainingDemand = this.demand
    let result = 0
    this.producers.sort((a, b) => a.cost - b.cost).forEach(p => {
      const contiribution = Math.min(remainingDemand, p.production)
      remainingDemand -= contiribution
      result += contiribution * p.cost
    })

    return result
  }
}

module.exports = Province
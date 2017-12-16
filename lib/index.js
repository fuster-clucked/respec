let $seq = require( './seq' )

class Prod {

  constructor ( ...ptns ) {
    this.ptns = ptns
  }

  get length () {
    return this.ptns.length
  }

  at ( i ) {
    return this.ptns[ i ]
  }

}

class Part {

  constructor ( ...rngs ) {
    this.rngs = rngs
  }

  get length () {
    return this.rngs.length
  }

  at ( i ) {
    return this.rngs[ i ]
  }

}

class All {

  constructor ( rng ) {
    this.rng = rng
  }

  get length () {
    return this.rng.length
  }

  at ( i ) {
    return {
      length: 1,
      at: () =>
        this.rng.at( i )
    }
  }

}

class Rng {

  union ( rng ) {
    return new Union( this, rng )
  }

}

class Union extends Rng {

  constructor ( rng0, rng1 ) {
    super()
    this.rng0 = rng0
    this.rng1 = rng1
  }

  get length () {
    return this.rng0.length + this.rng1.length
  }

  at ( i ) {
    return i < this.rng0.length ?
      this.rng0.at( i ) : this.rng1.at( i - this.rng0.length )
  }

}

class Int extends Rng {

  constructor ( min, max ) {
    super()
    this.min = min
    this.max = max
  }

  get length () {
    return this.max - this.min + 1
  }

  at ( i ) {
    return this.min + i
  }

}

class Enum extends Rng {

  constructor ( ...vals ) {
    super()
    this.vals = vals
  }

  get length () {
    return this.vals.length
  }

  at ( i ) {
    return this.vals[ i ]
  }

}

module.exports = {

  $seq,

  $prod: ( ...items ) =>
    new Prod( ...items ),

  $part: ( ...rngs ) =>
    new Part( ...rngs ),

  $all: ( rng ) =>
    new All( rng ),

  $union: ( rng0, ...rngs ) =>
    rngs.reduce( ( sum, rng ) =>
      sum.union( rng ),
    rng0 ),

  $int: ( min, max ) =>
    new Int( min, max ),

  $enum: ( ...vals ) =>
    new Enum( ...vals ),

  $null: ( rng ) =>
    new Union( new Enum( null ), rng ),

  $bound: ( int ) =>
    new Part(
      new Enum( int.min ),
      new Int( int.min + 1, int.max - 1 ),
      new Enum( int.max )
    ),

  $int8: new Int( -128, 127 ),

  $bool: new Enum( false, true )

}

let { floor, random } = Math

class Seq {

  constructor ( src ) {
    this.src = src
  }

  * expect ( pred ) {
    for ( let val of this.src() )
      yield {
        val, pred,
        pass: pred.apply( null, val )
      }
  }

}

module.exports = ( prod ) =>
  new Seq( function* () {

    let idx = Array( prod.length ).fill( 0 )

    for ( ;; ) {

      yield idx.map( ( j, i ) => {
        let union = prod.at( i ).at( j )
        return union.at( floor( union.length * random() ) )
      } )

      for ( let i = prod.length - 1; ; i-- ) {
        if ( ++idx[ i ] < prod.at( i ).length )
          break
        if ( i === 0 )
          return
        idx[ i ] = 0
      }

    }

  } )

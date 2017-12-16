let { assoc, ident, inv, comm } = require( './alg' )

let

  neg = ( x ) =>
    -x,

  add = ( x, y ) =>
    x + y

module.exports = {

  add: [

    $given( $bound( $int8 ), $bound( $int8 ), $bound( $int8 ) )
      .expect( assoc( add ) ),

    $given( $bound( $int8 ) )
      .expect( ident( add, 0 ) ),

    $given( $bound( $int8 ) )
      .expect( inv( add, neg, 0 ) ),

    $given( $bound( $int8 ), $bound( $int8 ) )
      .expect( comm( add ) )

  ]

}

let { assoc, ident, inv, comm } = require( './alg' )

let

  not = ( x ) =>
    !x,

  or = ( x, y ) =>
    x || y,

  and = ( x, y ) =>
    x && y

module.exports = {

  or: [

    $given( $all( $bool ), $all( $bool ), $all( $bool ) )
      .expect( assoc( or ) ),

    $given( $all( $bool ) )
      .expect( ident( or, false ) ),

    $given( $all( $bool ) )
      .expect( inv( or, not, true ) ),

    $given( $all( $bool ), $all( $bool ) )
      .expect( comm( or ) )

  ],

  and: [

    $given( $all( $bool ), $all( $bool ), $all( $bool ) )
      .expect( assoc( and ) ),

    $given( $all( $bool ) )
      .expect( ident( and, true ) ),

    $given( $all( $bool ) )
      .expect( inv( and, not, false ) ),

    $given( $all( $bool ), $all( $bool ) )
      .expect( comm( and ) )

  ]

}

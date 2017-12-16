let { assoc, ident, inv, comm } = require( './alg' )

let

  $bool3 = $null( $bool ),

  not = ( x ) =>
    x == null ? null : !x,

  or = ( x, y ) =>
    x == null ? y || null : x || y,

  and = ( x, y ) =>
    x == null ? y && null : x && y

module.exports = {

  or: [

    $given( $all( $bool3 ), $all( $bool3 ), $all( $bool3 ) )
      .expect( assoc( or ) ),

    $given( $all( $bool3 ) )
      .expect( ident( or, false ) ),

    $given( $all( $bool3 ), $all( $bool3 ) )
      .expect( comm( or ) )

  ],

  and: [

    $given( $all( $bool3 ), $all( $bool3 ), $all( $bool3 ) )
      .expect( assoc( and ) ),

    $given( $all( $bool3 ) )
      .expect( ident( and, true ) ),

    $given( $all( $bool3 ), $all( $bool3 ) )
      .expect( comm( and ) )

  ]

}

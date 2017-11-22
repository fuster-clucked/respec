const

  associative = ( op ) => ( a, b, c ) =>
    op( op( a, b ), c ) === op( a, op( b, c ) ),

  identity = ( op, id ) => ( a ) =>
    op( a, id ) === a && op( id, a ) === a,

  inverse = ( op, inv, id ) => ( a ) =>
    op( a, inv( a ) ) === id && op( inv( a ), a ) === id,

  commutative = ( op ) => ( a, b ) =>
    op( a, b ) === op( b, a ),

  monoid = ( set, op, id ) => {

    given( set, set, set )(
      associative( op )
    )

    given( set )(
      identity( op, id )
    )

  },

  abelian = ( set, op, inv, id ) => {

    monoid( set, op, id )

    given( set )(
      inverse( op, inv, id )
    )

    given( set, set )(
      commutative( op )
    )

  }

module.exports = {

  associative,
  identity,
  inverse,
  commutative,

  monoid,
  abelian

}

const {
  monoid,
  inverse,
  commutative
} = require( './lib/algebra' )

const
  not = ( a ) =>
    !a,

  or = ( a, b ) =>
    a || b,

  and = ( a, b ) =>
    a && b

module.exports = {

  or () {

    monoid( all( Bool ), or, false )

    given( all( Bool ) )(
      inverse( or, not, true )
    )

    given( all( Bool ), all( Bool ) )(
      commutative( or )
    )

  },

  and () {

    monoid( all( Bool ), and, true )

    given( all( Bool ) )(
      inverse( and, not, false )
    )

    given( all( Bool ), all( Bool ) )(
      commutative( and )
    )

  }

}

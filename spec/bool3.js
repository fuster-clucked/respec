const {
  monoid,
  inverse,
  commutative
} = require( './lib/algebra' )

const
  Bool3 = Enum( false, true, null ),

  not = ( a ) =>
    !a,

  or = ( a, b ) =>
    a || b,

  and = ( a, b ) =>
    a && b

module.exports = {

  or () {
    monoid( all( Bool3 ), or, false )

    given( all( Bool3 ) )(
      inverse( or, not, true )
    )

    given( all( Bool3 ), all( Bool3 ) )(
      commutative( or )
    )

  },

  and () {

    monoid( all( Bool3 ), and, true )

    given( all( Bool3 ) )(
      inverse( and, not, false )
    )

    given( all( Bool3 ), all( Bool3 ) )(
      commutative( and )
    )

  }

}

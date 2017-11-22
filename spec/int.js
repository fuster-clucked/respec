const { abelian } = require( './lib/algebra' )

const
  neg = ( a ) =>
    -a,

  add = ( a, b ) =>
    a + b

module.exports = {

  add: () =>
    abelian( any( Int16 ), add, neg, 0 )

}

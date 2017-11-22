const

  Range = ( min, max ) => ({

    all: function* () {
      for ( let value = min; value <= max; value++ )
        yield value
    },

    any: ( seed ) =>
      Math.floor( ( max - min + 1 ) * seed ) + min

  }),

  Enum = ( ...values ) => {

    let range = Range( 0, values.length - 1 )

    return {

      all: function* () {
        for ( let v of range.all() )
          yield values[ v ]
      },

      any: ( seed ) =>
        values[ range.any( seed ) ]

    }
  }

module.exports = {

  Range,
  Enum,

  Int16: Range( -32768, 32767 ),

  Bool: Enum( false, true ),

  any: ( dom ) =>
    function* () {
      yield dom.any( Math.random() )
    },

  all: ( dom ) =>
    dom.all

}

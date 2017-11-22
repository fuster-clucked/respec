const
  product = require( './product' ),
  domains = require( './domains' )

module.exports = Object.assign(

  ( opts ) => {

    const {
      max,
      before,
      each,
      after
    } = Object.assign( { max: 1 }, opts )

    return ( ...sets ) => ( ...preds ) =>

      preds.forEach( ( pred ) => {

        if ( before )
          before( pred )

        let i = 0

        for ( let args of product( sets ) ) {

          if ( i++ >= max )
            break

          if ( each )
            each( pred, args, pred.apply( null, args ) )

        }

        if ( after )
          after( pred )
      } )

  },

  domains

)

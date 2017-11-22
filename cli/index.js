const respec = require( '../core' )

let fails = 0

const total = {
  tests: 0,
  fails: 0
}

Object.assign( global, respec )

global.given = respec( {

  max: 32, // TODO: per-test overrides so this can be set to a lower value

  before: ( pred ) => {
    fails = 0
    console.log( '    ▾', String( pred ).replace( /\n\s*/, ' ' ) )
  },

  each: ( pred, args, pass ) => {
    fails += !pass
    total.tests++
    console.log(
      '     ',
      pass ? '\u001b[32;2m✓\u001b[37m' : '\u001b[31;2m✖\u001b[37m',
      args, '\u001b[0m'
    )
  },

  after: ( pred ) => {
    total.fails += fails
    console.log(
      '       ',
      !fails ? '\u001b[32mPASS\u001b[0m' : '\u001b[31mFAIL\u001b[0m'
    )
  }

} )

// load specs after defining globals
const spec = require( '../spec' )

for ( const s in spec ) {

  const suite = spec[ s ]

  console.log( '▾', s )

  for ( const t in suite ) {
    console.log( '  ▾', t )
    suite[ t ]()
  }

}

console.log(
  !total.fails ? '\u001b[32m✓' : '\u001b[31m✖',
  total.fails, 'of', total.tests, 'failed', '\u001b[0m'
)

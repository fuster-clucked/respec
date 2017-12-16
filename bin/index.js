let
  lib = require( '../lib' ),
  { assign } = Object,
  { log } = console

assign( global, lib )

global.$given = ( ...ptns ) =>
  $seq( $prod( ...ptns ) )

let
  last = null,
  tests = 0,
  fails = 0,
  total = {
    tests: 0,
    fails: 0
  }

// NOTE: load specs after defining globals
let specs = require( '../eg' )

for ( let spec in specs ) {
  let suites = specs[ spec ]
  log( '▾', spec )

  for ( let suite in suites ) {
    let tests = suites[ suite ]
    log( '  ▾', suite )

    for ( let test of tests ) {

      for ( let { val, pred, pass } of test ) {

        if ( pred !== last ) {
          tests = 0
          fails = 0
          log( '    ▾', String( pred ).replace( /\n\s*/, ' ' ) )
        }

        tests++
        fails += !pass
        log(
          '     ',
          pass ? '\u001b[32;2m✓\u001b[37m' : '\u001b[31;2m✖\u001b[37m',
          val, '\u001b[0m'
        )

        last = pred

      }

      total.tests += tests
      total.fails += fails
      log(
        '     ',
        !fails ? '\u001b[32m✓ PASS' : '\u001b[31m✖ FAIL',
        !fails ? tests : fails, 'of', tests, '\u001b[0m'
      )

    }
  }
}

log(
  !total.fails ? '\u001b[32m✓ PASS' : '\u001b[31m✖ FAIL',
  !total.fails ? total.tests : total.fails, 'of', total.tests, '\u001b[0m'
)

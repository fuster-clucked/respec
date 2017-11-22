module.exports = function* ( sets ) {

  const seqs = sets.map( ( set ) => {
    const itr = set()
    return { itr, next: itr.next() }
  } )

  // TODO: check if any generator initially had nothing to yield?

  for ( ;; ) {

    yield seqs.map( ( seq ) => seq.next.value )

    // iterate through right-most domains first
    for ( let i = seqs.length - 1 ; i >= 0; i-- ) {

      const seq = seqs[ i ]

      let next = seq.itr.next()

      if ( next.done ) {

        if ( i === 0 )
          return

        // reset sequence
        next = ( seq.itr = sets[ i ]() ).next()

      }
      else i = -1 // bail out of inner loop

      seq.next = next

    }

  }

}

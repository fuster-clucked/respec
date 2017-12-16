module.exports = {

  assoc: ( op ) => ( x, y, z ) =>
    op( op( x, y ), z ) === op( x, op( y, z ) ),

  ident: ( op, id ) => ( x ) =>
    op( x, id ) === x && op( id, x ) === x,

  inv: ( op, inv, id ) => ( x ) =>
    op( x, inv( x ) ) === id && op( inv( x ), x ) === id,

  comm: ( op ) => ( x, y ) =>
    op( x, y ) === op( y, x )

}

"use strict";

const babeit = require('./babeit');
const server = babeit.listen(babeit.get('port'), (err) =>
{
  if(err) return;
  console.log(`Started server on port: ${babeit.get('port')}`);
});

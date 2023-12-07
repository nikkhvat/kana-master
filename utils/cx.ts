
const cx = (...args: any[]) => {
  let object = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    object = { ...object, ...arg }
  }

  return object;
}

export default cx;
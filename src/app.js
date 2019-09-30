function add(a, b) {
  const result = Number(a) + Number(b);
  return result;
}

function showProcessDetails() {
  console.log(`Node Version: ${process.version}`);
  console.log(`Plattform: ${process.platform} ${process.arch}`);
  console.log(`Arguments: ${process.argv.join(" ")}`);
  console.log(`Result: ${add(process.argv[2], process.argv[3])}`);
}

showProcessDetails();

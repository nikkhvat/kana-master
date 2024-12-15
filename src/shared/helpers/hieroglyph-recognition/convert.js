
const kanaTemplates = {
  あ: [[["0.0520", "0.1692"], ["0.0642", "0.1692"], ["0.0714", "0.1716"], ["0.0784", "0.1713"], ["0.0784", "0.1713"], ["0.1152", "0.1713"], ["0.1289", "0.1739"], ["0.1458", "0.1735"], ["0.4486", "0.1735"], ["0.4716", "0.1721"], ["0.4965", "0.1699"], ["0.5197", "0.1677"], ["0.5197", "0.1677"], ["0.5413", "0.1670"], ["0.5650", "0.1670"], ["0.5866", "0.1648"], ["0.6109", "0.1610"], ["0.6348", "0.1566"], ["0.6586", "0.1544"], ["0.6802", "0.1522"], ["0.6802", "0.1522"], ["0.7016", "0.1518"], ["0.7211", "0.1518"], ["0.7426", "0.1496"], ["0.7785", "0.1455"], ["0.7953", "0.1412"], ["0.8123", "0.1389"], ["0.8267", "0.1388"], ["0.8267", "0.1388"], ["0.8388", "0.1366"], ["0.8507", "0.1344"], ["0.8625", "0.1323"], ["0.8720", "0.1323"], ["0.8793", "0.1324"], ["0.8864", "0.1301"], ["0.9103", "0.1301"], ["0.9103", "0.1301"], ["0.9075", "0.1323"], ["0.9049", "0.1323"], ["0.9004", "0.1344"]], [["0.4642", "0.0000"], ["0.4571", "0.0088"], ["0.4522", "0.0177"], ["0.4449", "0.0331"], ["0.4377", "0.0571"], ["0.4305", "0.0790"], ["0.4281", "0.0931"], ["0.4184", "0.1343"], ["0.4112", "0.1681"], ["0.4097", "0.1834"], ["0.4039", "0.2143"], ["0.4002", "0.2464"], ["0.3944", "0.2815"], ["0.3931", "0.2991"], ["0.3920", "0.3336"], ["0.3884", "0.3640"], ["0.3860", "0.3797"], ["0.3876", "0.5068"], ["0.3884", "0.5399"], ["0.3907", "0.5923"], ["0.3931", "0.6120"], ["0.3955", "0.6451"], ["0.4002", "0.6760"], ["0.4071", "0.7127"], ["0.4097", "0.7303"], ["0.4190", "0.7676"], ["0.4262", "0.8003"], ["0.4287", "0.8135"], ["0.4383", "0.8420"], ["0.4455", "0.8729"], ["0.4527", "0.9035"], ["0.4547", "0.9165"], ["0.4618", "0.9406"], ["0.4695", "0.9598"], ["0.4719", "0.9664"], ["0.4737", "0.9768"], ["0.4761", "0.9808"], ["0.4737", "0.9775"], ["0.4737", "0.9751"], ["0.4690", "0.9740"]], [["0.8080", "0.3474"], ["0.7717", "0.4177"], ["0.7333", "0.4967"], ["0.7043", "0.5498"], ["0.6709", "0.6152"], ["0.6207", "0.6898"], ["0.5777", "0.7403"], ["0.5388", "0.7864"], ["0.4596", "0.8579"], ["0.4114", "0.8951"], ["0.3747", "0.9235"], ["0.3198", "0.9542"], ["0.2625", "0.9784"], ["0.2146", "0.9935"], ["0.1114", "0.9839"], ["0.0658", "0.9576"], ["0.0312", "0.9147"], ["0.0000", "0.8490"], ["0.0068", "0.7220"], ["0.0380", "0.6650"], ["0.0899", "0.6101"], ["0.1513", "0.5575"], ["0.2175", "0.5135"], ["0.3102", "0.4669"], ["0.3994", "0.4297"], ["0.4953", "0.4034"], ["0.5937", "0.3904"], ["0.7656", "0.3978"], ["0.8375", "0.4219"], ["0.9043", "0.4656"], ["0.9473", "0.5109"], ["0.9807", "0.5613"], ["1.0000", "0.6226"], ["0.9876", "0.7342"], ["0.9682", "0.7957"], ["0.9286", "0.8505"], ["0.8901", "0.8966"], ["0.8517", "0.9345"], ["0.7962", "0.9869"], ["0.7795", "1.0000"]]]
}


const convert = (array) => array.map(line => line.map(item => [item.x, item.y]));

for (const key in kanaTemplates) {
  if (Object.prototype.hasOwnProperty.call(kanaTemplates, key)) {
    const element = kanaTemplates[key];
    
    console.log(`${key}: ${JSON.stringify(convert(element))},`)
  }
}
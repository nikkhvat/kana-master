// basic
import HA from "../assets/kana/H-A.svg";
import HFU from "../assets/kana/H-FU.svg";
import HHI from "../assets/kana/H-HI.svg";
import HKA from "../assets/kana/H-KA.svg";
import HKO from "../assets/kana/H-KO.svg";
import HME from "../assets/kana/H-ME.svg";
import HMU from "../assets/kana/H-MU.svg";
import HNE from "../assets/kana/H-NE.svg";
import HNU from "../assets/kana/H-NU.svg";
import HRE from "../assets/kana/H-RE.svg";
import HRU from "../assets/kana/H-RU.svg";
import HSHI from "../assets/kana/H-SHI.svg";
import HTA from "../assets/kana/H-TA.svg";
import HTSU from "../assets/kana/H-TSU.svg";
import HWE from "../assets/kana/H-WE.svg";
import HYA from "../assets/kana/H-YA.svg";
import HCHI from "../assets/kana/H-CHI.svg";
import HHA from "../assets/kana/H-HA.svg";
import HHO from "../assets/kana/H-HO.svg";
import HKE from "../assets/kana/H-KE.svg";
import HKU from "../assets/kana/H-KU.svg";
import HMI from "../assets/kana/H-MI.svg";
import HN from "../assets/kana/H-N.svg";
import HNI from "../assets/kana/H-NI.svg";
import HO from "../assets/kana/H-O.svg";
import HRI from "../assets/kana/H-RI.svg";
import HSA from "../assets/kana/H-SA.svg";
import HSO from "../assets/kana/H-SO.svg";
import HTE from "../assets/kana/H-TE.svg";
import HU from "../assets/kana/H-U.svg";
import HWI from "../assets/kana/H-WI.svg";
import HYO from "../assets/kana/H-YO.svg";
import HE from "../assets/kana/H-E.svg";
import HHE from "../assets/kana/H-HE.svg";
import HI from "../assets/kana/H-I.svg";
import HKI from "../assets/kana/H-KI.svg";
import HMA from "../assets/kana/H-MA.svg";
import HMO from "../assets/kana/H-MO.svg";
import HNA from "../assets/kana/H-NA.svg";
import HNO from "../assets/kana/H-NO.svg";
import HRA from "../assets/kana/H-RA.svg";
import HRO from "../assets/kana/H-RO.svg";
import HSE from "../assets/kana/H-SE.svg";
import HSU from "../assets/kana/H-SU.svg";
import HTO from "../assets/kana/H-TO.svg";
import HWA from "../assets/kana/H-WA.svg";
import HWO from "../assets/kana/H-WO.svg";
import HYU from "../assets/kana/H-YU.svg";

// 2
import HBA from "../assets/kana/H-BA.svg"
import HBI from "../assets/kana/H-BI.svg"
import HBU from "../assets/kana/H-BU.svg"
import HDE from "../assets/kana/H-DE.svg"
import HDO from "../assets/kana/H-DO.svg"
import HGA from "../assets/kana/H-GA.svg"
import HGI from "../assets/kana/H-GI.svg"
import HGU from "../assets/kana/H-GU.svg"
import HZA from "../assets/kana/H-ZA.svg"
import HZO from "../assets/kana/H-ZO.svg"
import HBE from "../assets/kana/H-BE.svg"
import HBO from "../assets/kana/H-BO.svg"
import HDA from "../assets/kana/H-DA.svg"
import HDJI from "../assets/kana/H-DJI.svg"
import HDZU from "../assets/kana/H-DZU.svg"
import HGE from "../assets/kana/H-GE.svg"
import HGO from "../assets/kana/H-GO.svg"
import HJI from "../assets/kana/H-JI.svg"
import HZE from "../assets/kana/H-ZE.svg"
import HZU from "../assets/kana/H-ZU.svg"

// 3
import HPA from "../assets/kana/H-PA.svg"
import HPE from "../assets/kana/H-PE.svg"
import HPI from "../assets/kana/H-PI.svg"
import HPO from "../assets/kana/H-PO.svg"
import HPU from "../assets/kana/H-PU.svg"


import HCHA from "../assets/kana/H-CHA.svg"
import HCHU from "../assets/kana/H-CHU.svg"
import HHYO from "../assets/kana/H-HYO.svg"
import HKYA from "../assets/kana/H-KYA.svg"
import HKYU from "../assets/kana/H-KYU.svg"
import HMYO from "../assets/kana/H-MYO.svg"
import HNYA from "../assets/kana/H-NYA.svg"
import HNYU from "../assets/kana/H-NYU.svg"
import HRYO from "../assets/kana/H-RYO.svg"
import HSHA from "../assets/kana/H-SHA.svg"
import HSHU from "../assets/kana/H-SHU.svg"
import HCHO from "../assets/kana/H-CHO.svg"
import HHYA from "../assets/kana/H-HYA.svg"
import HHYU from "../assets/kana/H-HYU.svg"
import HKYO from "../assets/kana/H-KYO.svg"
import HMYA from "../assets/kana/H-MYA.svg"
import HMYU from "../assets/kana/H-MYU.svg"
import HNYO from "../assets/kana/H-NYO.svg"
import HRYA from "../assets/kana/H-RYA.svg"
import HRYU from "../assets/kana/H-RYU.svg"
import HSHO from "../assets/kana/H-SHO.svg"

const getImage = (key: string | undefined, iamgeStyle: any) => {

  if (key === undefined) return <HA style={iamgeStyle} />;

  switch (key.trim()) {
    // Basic
    case "H-A": return <HA style={ iamgeStyle } />
    case "H-FU": return <HFU style={ iamgeStyle } />
    case "H-HI": return <HHI style={ iamgeStyle } />
    case "H-KA": return <HKA style={ iamgeStyle } />
    case "H-KO": return <HKO style={ iamgeStyle } />
    case "H-ME": return <HME style={ iamgeStyle } />
    case "H-MU": return <HMU style={ iamgeStyle } />
    case "H-NE": return <HNE style={ iamgeStyle } />
    case "H-NU": return <HNU style={ iamgeStyle } />
    case "H-RE": return <HRE style={ iamgeStyle } />
    case "H-RU": return <HRU style={ iamgeStyle } />
    case "H-SHI": return <HSHI style={ iamgeStyle } />
    case "H-TA": return <HTA style={ iamgeStyle } />
    case "H-TSU": return <HTSU style={ iamgeStyle } />
    case "H-WE": return <HWE style={ iamgeStyle } />
    case "H-YA": return <HYA style={ iamgeStyle } />
    case "H-CHI": return <HCHI style={ iamgeStyle } />
    case "H-HA": return <HHA style={ iamgeStyle } />
    case "H-HO": return <HHO style={ iamgeStyle } />
    case "H-KE": return <HKE style={ iamgeStyle } />
    case "H-KU": return <HKU style={ iamgeStyle } />
    case "H-MI": return <HMI style={ iamgeStyle } />
    case "H-N": return <HN style={ iamgeStyle } />
    case "H-NI": return <HNI style={ iamgeStyle } />
    case "H-O": return <HO style={ iamgeStyle } />
    case "H-RI": return <HRI style={ iamgeStyle } />
    case "H-SA": return <HSA style={ iamgeStyle } />
    case "H-SO": return <HSO style={ iamgeStyle } />
    case "H-TE": return <HTE style={ iamgeStyle } />
    case "H-U": return <HU style={ iamgeStyle } />
    case "H-WI": return <HWI style={ iamgeStyle } />
    case "H-YO": return <HYO style={ iamgeStyle } />
    case "H-E": return <HE style={ iamgeStyle } />
    case "H-HE": return <HHE style={ iamgeStyle } />
    case "H-I": return <HI style={ iamgeStyle } />
    case "H-KI": return <HKI style={ iamgeStyle } />
    case "H-MA": return <HMA style={ iamgeStyle } />
    case "H-MO": return <HMO style={ iamgeStyle } />
    case "H-NA": return <HNA style={ iamgeStyle } />
    case "H-NO": return <HNO style={ iamgeStyle } />
    case "H-RA": return <HRA style={ iamgeStyle } />
    case "H-RO": return <HRO style={ iamgeStyle } />
    case "H-SE": return <HSE style={ iamgeStyle } />
    case "H-SU": return <HSU style={ iamgeStyle } />
    case "H-TO": return <HTO style={ iamgeStyle } />
    case "H-WA": return <HWA style={ iamgeStyle } />
    case "H-WO": return <HWO style={ iamgeStyle } />
    case "H-YU": return <HYU style={ iamgeStyle } />
    // Dakuon
    case "H-BA": return <HBA style={ iamgeStyle } />
    case "H-BI": return <HBI style={ iamgeStyle } />
    case "H-BU": return <HBU style={ iamgeStyle } />
    case "H-DE": return <HDE style={ iamgeStyle } />
    case "H-DO": return <HDO style={ iamgeStyle } />
    case "H-GA": return <HGA style={ iamgeStyle } />
    case "H-GI": return <HGI style={ iamgeStyle } />
    case "H-GU": return <HGU style={ iamgeStyle } />
    case "H-ZA": return <HZA style={ iamgeStyle } />
    case "H-ZO": return <HZO style={ iamgeStyle } />
    case "H-BE": return <HBE style={ iamgeStyle } />
    case "H-BO": return <HBO style={ iamgeStyle } />
    case "H-DA": return <HDA style={ iamgeStyle } />
    case "H-DJI": return <HDJI style={ iamgeStyle } />
    case "H-DZU": return <HDZU style={ iamgeStyle } />
    case "H-GE": return <HGE style={ iamgeStyle } />
    case "H-GO": return <HGO style={ iamgeStyle } />
    case "H-JI": return <HJI style={ iamgeStyle } />
    case "H-ZE": return <HZE style={ iamgeStyle } />
    case "H-ZU": return <HZU style={ iamgeStyle } />
    // Handakuon
    case "H-PA": return <HPA style={ iamgeStyle } />
    case "H-PE": return <HPE style={ iamgeStyle } />
    case "H-PI": return <HPI style={ iamgeStyle } />
    case "H-PO": return <HPO style={ iamgeStyle } />
    case "H-PU": return <HPU style={ iamgeStyle } />
    // 
    case "H-CHA": return <HCHA style={ iamgeStyle } />
    case "H-CHU": return <HCHU style={ iamgeStyle } />
    case "H-HYO": return <HHYO style={ iamgeStyle } />
    case "H-KYA": return <HKYA style={ iamgeStyle } />
    case "H-KYU": return <HKYU style={ iamgeStyle } />
    case "H-MYO": return <HMYO style={ iamgeStyle } />
    case "H-NYA": return <HNYA style={ iamgeStyle } />
    case "H-NYU": return <HNYU style={ iamgeStyle } />
    case "H-RYO": return <HRYO style={ iamgeStyle } />
    case "H-SHA": return <HSHA style={ iamgeStyle } />
    case "H-SHU": return <HSHU style={ iamgeStyle } />
    case "H-CHO": return <HCHO style={ iamgeStyle } />
    case "H-HYA": return <HHYA style={ iamgeStyle } />
    case "H-HYU": return <HHYU style={ iamgeStyle } />
    case "H-KYO": return <HKYO style={ iamgeStyle } />
    case "H-MYA": return <HMYA style={ iamgeStyle } />
    case "H-MYU": return <HMYU style={ iamgeStyle } />
    case "H-NYO": return <HNYO style={ iamgeStyle } />
    case "H-RYA": return <HRYA style={ iamgeStyle } />
    case "H-RYU": return <HRYU style={ iamgeStyle } />
    case "H-SHO": return <HSHO style={ iamgeStyle } />

    default: return <HA style={ iamgeStyle } />
  }
};

export default getImage;
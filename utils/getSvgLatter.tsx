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

const getImage = (key: string | undefined, iamgeStyle: any) => {

  if (key === undefined) return <HA style={iamgeStyle} />;

  switch (key.trim()) {
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
    default: return <HA style={ iamgeStyle } />
  }
};

export default getImage;
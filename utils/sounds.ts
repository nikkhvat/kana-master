import e from "../assets/sounds/e.mp3"
import a from "../assets/sounds/a.mp3"
import ha from "../assets/sounds/ha.mp3"
import hi from "../assets/sounds/hi.mp3"
import i from "../assets/sounds/i.mp3"
import ke from "../assets/sounds/ke.mp3"
import ko from "../assets/sounds/ko.mp3"
import ma from "../assets/sounds/ma.mp3"
import mi from "../assets/sounds/mi.mp3"
import mu from "../assets/sounds/mu.mp3"
import na from "../assets/sounds/na.mp3"
import ni from "../assets/sounds/ni.mp3"
import nu from "../assets/sounds/nu.mp3"
import ra from "../assets/sounds/ra.mp3"
import ri from "../assets/sounds/ri.mp3"
import ru from "../assets/sounds/ru.mp3"
import se from "../assets/sounds/se.mp3"
import so from "../assets/sounds/so.mp3"
import ta from "../assets/sounds/ta.mp3"
import to from "../assets/sounds/to.mp3"
import u from "../assets/sounds/u.mp3"
import wo from "../assets/sounds/wo.mp3"
import yo from "../assets/sounds/yo.mp3"
import chi from "../assets/sounds/chi.mp3"
import fu from "../assets/sounds/fu.mp3"
import he from "../assets/sounds/he.mp3"
import ho from "../assets/sounds/ho.mp3"
import ka from "../assets/sounds/ka.mp3"
import ki from "../assets/sounds/ki.mp3"
import ku from "../assets/sounds/ku.mp3"
import me from "../assets/sounds/me.mp3"
import mo from "../assets/sounds/mo.mp3"
import n from "../assets/sounds/n.mp3"
import ne from "../assets/sounds/ne.mp3"
import no from "../assets/sounds/no.mp3"
import o from "../assets/sounds/o.mp3"
import re from "../assets/sounds/re.mp3"
import ro from "../assets/sounds/ro.mp3"
import sa from "../assets/sounds/sa.mp3"
import shi from "../assets/sounds/shi.mp3"
import su from "../assets/sounds/su.mp3"
import te from "../assets/sounds/te.mp3"
import tsu from "../assets/sounds/tsu.mp3"
import wa from "../assets/sounds/wa.mp3"
import ya from "../assets/sounds/ya.mp3"
import yu from "../assets/sounds/yu.mp3"

const getScoundByLetter = (letter: string) => {
  const key = letter.toLowerCase().trim()

  const sounds: any = {
    e,
    a,
    ha,
    hi,
    i,
    ke,
    ko,
    ma,
    mi,
    mu,
    na,
    ni,
    nu,
    ra,
    ri,
    ru,
    se,
    so,
    ta,
    to,
    u,
    wo,
    yo,
    chi,
    fu,
    he,
    ho,
    ka,
    ki,
    ku,
    me,
    mo,
    n,
    ne,
    no,
    o,
    re,
    ro,
    sa,
    shi,
    su,
    te,
    tsu,
    wa,
    ya,
    yu,
  }

  if (sounds[key]) {
    return sounds[key]
  }

  return sounds[key]
}

export default getScoundByLetter;
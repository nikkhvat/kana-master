/* eslint-disable @typescript-eslint/no-explicit-any */
import a from './basic/a.mp3';
import chi from './basic/chi.mp3';
import e from './basic/e.mp3';
import fu from './basic/fu.mp3';
import ha from './basic/ha.mp3';
import he from './basic/he.mp3';
import hi from './basic/hi.mp3';
import ho from './basic/ho.mp3';
import i from './basic/i.mp3';
import ka from './basic/ka.mp3';
import ke from './basic/ke.mp3';
import ki from './basic/ki.mp3';
import ko from './basic/ko.mp3';
import ku from './basic/ku.mp3';
import ma from './basic/ma.mp3';
import me from './basic/me.mp3';
import mi from './basic/mi.mp3';
import mo from './basic/mo.mp3';
import mu from './basic/mu.mp3';
import n from './basic/n.mp3';
import na from './basic/na.mp3';
import ne from './basic/ne.mp3';
import ni from './basic/ni.mp3';
import no from './basic/no.mp3';
import nu from './basic/nu.mp3';
import o from './basic/o.mp3';
import ra from './basic/ra.mp3';
import re from './basic/re.mp3';
import ri from './basic/ri.mp3';
import ro from './basic/ro.mp3';
import ru from './basic/ru.mp3';
import sa from './basic/sa.mp3';
import se from './basic/se.mp3';
import shi from './basic/shi.mp3';
import so from './basic/so.mp3';
import su from './basic/su.mp3';
import ta from './basic/ta.mp3';
import te from './basic/te.mp3';
import to from './basic/to.mp3';
import tsu from './basic/tsu.mp3';
import u from './basic/u.mp3';
import wa from './basic/wa.mp3';
import wo from './basic/wo.mp3';
import ya from './basic/ya.mp3';
import yo from './basic/yo.mp3';
import yu from './basic/yu.mp3';

const getSound = (letter: string) => {
  const key = letter.toLowerCase().trim();

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
  };

  if (sounds[key]) {
    return sounds[key];
  }

  return sounds[key];
};

export default getSound;

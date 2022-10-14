import App from "./App";
import BeerMat1 from './ai_beermats/pyrmontbrewery_beermat_dalle_kangaroos_drinking_beer.png';
import BeerMat2 from './ai_beermats/pyrmontbrewery_beermat_dalle_koalas_having_a_frothy_opera_house.png';
import BeerMat3 from './ai_beermats/pyrmontbrewery_beermat_dalle_koalas_consolation_beer.png';
import BeerMat4 from './ai_beermats/pyrmontbrewery_beermat_dalle_koala_barangaroo.png';
import BeerMat5 from './ai_beermats/pyrmontbrewery_beermat_dalle_koalas_beer_harbourbrige.png';
import BeerMat6 from './ai_beermats/pyrmontbrewery_beermat_dalle_kanga_frothy.png';
import BeerMat7 from './ai_beermats/pyrmontbrewery_beermat_dalle_kangas_under_harbourbridge.png';
import BeerMat8 from './ai_beermats/pyrmontbrewery_beermat_dalle_koala_and_roo_having_a_beer.png';
import BeerMat9 from './ai_beermats/pyrmontbrewery_beermat_dalle_roos_beer_near_centrepoint.png';
import BeerMat10 from './ai_beermats/pyrmontbrewery_beermat_dalle_van_gogh.png';
import BeerMat11 from './ai_beermats/pyrmontbrewery_beermat_dalle_kangas_night_beer.png';
// import BeerMat12 from './ai_beermats/pyrmontbrewery_beermat_dalle_koaas_sharing_a_frothy.png';
// import BeerMat13 from './ai_beermats/pyrmontbrewery_beermat_dalle_drunk_wombat_on_a_spaceship.png';
// import BeerMat14 from './ai_beermats/pyrmontbrewery_beermat_dalle_kanaga_beers_city.png';
// import BeerMat15 from './ai_beermats/pyrmontbrewery_beermat_dalle_koala_beer_centrepoint.png';
// import BeerMat16 from './ai_beermats/pyrmontbrewery_beermat_dalle_koala_beer_crayons.png';
// import BeerMat17 from './ai_beermats/pyrmontbrewery_beermat_dalle_koala_cheers.png';
// import BeerMat18 from './ai_beermats/pyrmontbrewery_beermat_dalle_koala_craic.png';
// import BeerMat19 from './ai_beermats/pyrmontbrewery_beermat_dalle_koala_evening.png';
// import BeerMat20 from './ai_beermats/pyrmontbrewery_beermat_dalle_koala_goodtimes.png';
// import BeerMat21 from './ai_beermats/pyrmontbrewery_beermat_dalle_koala_street.png';
// import BeerMat22 from './ai_beermats/pyrmontbrewery_beermat_dalle_koala_with_a_durry.png';
// import BeerMat23 from './ai_beermats/pyrmontbrewery_beermat_dalle_koalas_beer_centrepoint.png';
// import BeerMat24 from './ai_beermats/pyrmontbrewery_beermat_dalle_kanga_frothy2.png';
// import BeerMat25 from './ai_beermats/pyrmontbrewery_beermat_dalle_koalas_beer_packers_pecker.png';
// import BeerMat26 from './ai_beermats/pyrmontbrewery_beermat_dalle_kanaga_beer_tree.png';
// import BeerMat27 from './ai_beermats/pyrmontbrewery_beermat_dalle_koalas_ferry.png';
// import BeerMat28 from './ai_beermats/pyrmontbrewery_beermat_dalle_koalas_green_beer.png';
// import BeerMat29 from './ai_beermats/pyrmontbrewery_beermat_dalle_koalas_hangingout.png';
// import BeerMat30 from './ai_beermats/pyrmontbrewery_beermat_dalle_hotpink_koalas.png';
// import BeerMat31 from './ai_beermats/pyrmontbrewery_beermat_dalle_koalas_ontop_harbourbridge.png';
// import BeerMat32 from './ai_beermats/pyrmontbrewery_beermat_dalle_koalas_operahouse_crayons.png';
// import BeerMat33 from './ai_beermats/pyrmontbrewery_beermat_dalle_mob_having_beers.png';
// import BeerMat34 from './ai_beermats/pyrmontbrewery_beermat_dalle_party_koalas.png';
// import BeerMat35 from './ai_beermats/pyrmontbrewery_beermat_dalle_party_koalas2.png';
// import BeerMat36 from './ai_beermats/pyrmontbrewery_beermat_dalle_psycho_koalas_bottle.png';
// import BeerMat37 from './ai_beermats/pyrmontbrewery_beermat_dalle_kanga_beer_harbourbridge.png';
// import BeerMat38 from './ai_beermats/pyrmontbrewery_beermat_dalle_roos_beer_pastle.png';
// import BeerMat39 from './ai_beermats/pyrmontbrewery_beermat_dalle_roos_street_drinkin.png';
// import BeerMat40 from './ai_beermats/pyrmontbrewery_beermat_dalle_kangas_beer_by_bridge.png';
// import BeerMat41 from './ai_beermats/pyrmontbrewery_beermat_dalle_wallaby_beer_stars.png';

import React, {Component} from "react";
import desktopImage from "./pyrmontbwy.gif";

class BeerMats extends Component {
    render() {
        let BeerMatsLink = 'BeerMats';
        let classLink2 = 'App-link2';

        return <div className="BeerMats">
            <header className="App-header">
            LOAD "BEERMATS"
                <div className="StringSpin">
                    <div className="LeftStringSpin">
                        Pyrmont Brewery AI Beer mats made with DALL.E 2
                    </div>
                </div>
            <img className={BeerMatsLink} src={BeerMat1} />
            <br/>
            <img className={BeerMatsLink} src={BeerMat2} />
            <br/>
            <img className={BeerMatsLink} src={BeerMat3} />
            <br/>
            <img className={BeerMatsLink} src={BeerMat4} />
            <br/>
            <img className={BeerMatsLink} src={BeerMat5} />
            <br/>
            <img className={BeerMatsLink} src={BeerMat6} />
            <br/>
            <img className={BeerMatsLink} src={BeerMat7} />
            <br/>
            <img className={BeerMatsLink} src={BeerMat8} />
            <br/>
            <img className={BeerMatsLink} src={BeerMat9} />
            <br/>
            <img className={BeerMatsLink} src={BeerMat10} />
            <br/>
            <img className={BeerMatsLink} src={BeerMat11} />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <p>
                <a href={"https://tinyurl.com/t2by8hz"} target={"_blank"} className={classLink2}>
                    pyrmontbrewery.com.au<br/>
                    ABN: 47 824 483 808<br/>
                    Tel: 9692 0016
                    <br/><br/>
                    &copy; 2007 Pyrmont Brewery
                    <br/><br/>
                    0 OK, 0:1
                    <br/>
                </a>
            </p>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            </header>
        </div>
    }
}

export default BeerMats;

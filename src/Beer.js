import quarryImage from "./beer.png";
import LabelHalfWayHouseChocolateStout from "./label_half_way_house_chocolate_stout.png";
import App from "./App";
import {Component} from "react";

class Beer extends Component {

    render() {
        let beerLink = 'Beer-link';

        return <div className="Beer" style={{backgroundImage: `url(${quarryImage})`}}>
                <div className="BeerSnap" style={{backgroundImage: `${this.props.label_url}`}}><a
                    href={"mailto:kegs_halfway@pyrmontbrewery.com?subject=Beer: Half Way House&body=I'd like 50L Keg (A type) / 20L Keg (A type) / 19L Corny keg (ball lock) / 330ml Cans X 24"}
                    target={"_blank"}
                    className={beerLink}>Program:<br/>{this.props.name}<br/>{this.props.beerstyle}<br/>{this.props.abv}<br/></a></div>
                <div className="BeerDesc">&gt; {this.props.name} {this.props.beerstyle}<br/>{this.props.abv}% IBU {this.props.ibu} EBC {this.props.ebc}<br/><br/>
                    {this.props.children}</div>
            </div>
    }
}

export default Beer;

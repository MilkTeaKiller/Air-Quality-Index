import sorry from './sorry.png';

export default function error() {

    return (
        <div style={{ height: "100vh" }}>
            <div style={{ textAlign: "center", verticalAlign: "middle", height: "100vh" }}>
                <img src={sorry} alt="sorry" style={{ height : "80vh" }} />
                <h3>Our Website is currently down for usage.<br />Sorry for the inconveniences caused.</h3>
            </div>
        </div>
        )
}

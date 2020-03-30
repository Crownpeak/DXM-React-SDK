import React from 'react';
import ReactDOM from 'react-dom';
import { CmsPage, CmsComponent } from '../../common/Cms.js';

class HomePage extends CmsPage
{
    render() {
        return (
            <div>
                <Navigation/>
                <main role="main">
                    <div className="jumbotron">
                        <HeroContainer/>
                    </div>
                    <div className="container">
                        <SecondaryContainer/>
                        <hr/>
                    </div>
                </main>
                <Footer/>
            </div>
        )
    }
}

class Navigation extends CmsComponent
{
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Disabled</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="false">Dropdown</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown01">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        )
    }
}

class Footer extends CmsComponent
{
    render()
    {
        return (
            <footer className="container">
                <p>© Company 2020</p>
            </footer>
        )
    }
}

class HeroContainer extends CmsComponent
{
    render() {
        return (
            <div className="container">
                <h1 className="display-3">Hello, world!</h1>
                <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
            </div>
        )
    }
}

class SecondaryContainerItem extends React.Component {
    render() {
        return (
            <div className="col-md-4">
                <h2>Heading</h2>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
            </div>
        );
    }
}

class SecondaryContainer extends React.Component {
    render() {
        return (
            <div className="row">
                <SecondaryContainerItem/>
                <SecondaryContainerItem/>
                <SecondaryContainerItem/>
            </div>
        );
    }
}

ReactDOM.render((<HomePage/>), document.getElementById('app'));
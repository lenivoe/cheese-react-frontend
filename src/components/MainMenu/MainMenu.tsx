import BlockMenu from './BlockMenu';
import StrainAddingFrom from './StrainAddingFrom';

export default function MainMenu() {
    return (
        <main className='main container'>
            <div className='main__content main-content'>
                <div className='main-content__menu'>
                    <BlockMenu />
                </div>
                <div className='main-content__data'>
                    <StrainAddingFrom />
                </div>
            </div>
        </main>
    );
}

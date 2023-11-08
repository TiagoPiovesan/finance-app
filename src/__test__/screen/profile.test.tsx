import { render } from '@testing-library/react-native'
import { Profile } from '../../screens/Profile'

describe('Profile Screen', () => { 
    it("Shoud have placeholder correctly in user name input", () => {
        const { getByPlaceholderText } = render(<Profile name="Tiago" surname="Piovesan"/>)
    
        const inputName = getByPlaceholderText("Nome")
        
        expect(inputName.props.placeholder).toBeTruthy()
    })
    
    it("Shoud be loadded user data", () => {
        const { getByTestId } = render(<Profile name="Tiago" surname="Piovesan"/>)
    
        const inputName = getByTestId("input-name")
        const inputSurname = getByTestId("input-surname")
    
        expect(inputName.props.value).toEqual("Tiago")
        expect(inputSurname.props.value).toEqual("Piovesan")
    })
    
    it("Shoud exist title correctly", () => {
        const { getByTestId } = render(<Profile name="Tiago" surname="Piovesan" />)
        
        const textTitle = getByTestId("text-title")
    
        expect(textTitle.props.children).toContain("Perfil")
    })
})
import React from 'react';
import styled, {ThemeProvider} from 'styled-components';

import theme from '../style/theme';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    color: ${(props) => props.theme.color.main};
    width: ${(props) => props.theme.size.xs};
                
    @media ${(props) => props.theme.breakpoint.sm}{
        width: ${(props) => props.theme.size.sm};
    }
    @media ${(props) => props.theme.breakpoint.md}{
        width: ${(props) => props.theme.size.md};
    }
    @media ${(props) => props.theme.breakpoint.lg}{
        width: ${(props) => props.theme.size.lg};
    }
`;

export default React.memo((props) => {

    return (
        <ThemeProvider theme={theme}>
            <Wrapper>
                <Container>
                    {props.children}
                </Container>
            </Wrapper>
        </ThemeProvider>
    )
})
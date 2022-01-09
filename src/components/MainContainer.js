import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
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
        <Wrapper>
            <Container>
                {props.children}
            </Container>
        </Wrapper>
    )
});
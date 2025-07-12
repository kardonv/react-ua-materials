import React from 'react';

interface ChildrenPropProps {
    children: React.ReactNode;
}

// class ChildrenProp extends React.Component<ChildrenPropProps> {
//     render() {
//         return (
//             <div>
//                 <h3>Children Prop</h3>
//                 <div>{this.props.children}</div>
//             </div>
//         );
//     }
// }
function ChildrenProp(props: ChildrenPropProps) {

    return (
        <div>
            <h3>Children Prop</h3>
            <div>{props.children}</div>
        </div>
    );

}

export default ChildrenProp;

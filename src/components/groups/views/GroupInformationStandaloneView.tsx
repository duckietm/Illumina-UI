import { GroupInformationEvent, GroupInformationParser } from "@nitrots/nitro-renderer"
import { FC, useState } from "react"
import { LocalizeText } from "../../../api"
import { NitroCardContentView, NitroCardHeaderView, NitroCardView } from "../../../common"
import { useMessageEvent } from "../../../hooks"
import { GroupInformationView } from "./GroupInformationView"

export const GroupInformationStandaloneView: FC<{}> = props =>
{
    const [ groupInformation, setGroupInformation ] = useState<GroupInformationParser>(null)

    useMessageEvent<GroupInformationEvent>(GroupInformationEvent, event =>
    {
        const parser = event.getParser()

        if((groupInformation && (groupInformation.id === parser.id)) || parser.flag) setGroupInformation(parser)
    })

    if(!groupInformation) return null

    return (
        <NitroCardView uniqueKey="group-information-standalone" className="illumina-group-information-standalone w-[363px]" customZIndex={ 500 }>
            <NitroCardHeaderView headerText={ LocalizeText("group.window.title") } onCloseClick={ event => setGroupInformation(null) } />
            <NitroCardContentView>
                <GroupInformationView groupInformation={ groupInformation } onClose={ () => setGroupInformation(null) } />
            </NitroCardContentView>
        </NitroCardView>
    )
}

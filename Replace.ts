export default class Replace {
    public static replaceTag = (tag: string) => {
        tag = tag
        .replace(/gabriel dropout/i, "ガヴリールドロップアウト")
        .replace(/tenma gabriel white|gabriel white|gabriel/i, "天真=ガヴリール=ホワイト")
        .replace(/vignette tsukinose april|vignette tsukinose|vignette/i, "月乃瀬=ヴィネット=エイプリル")
        .replace(/satanichia kurumizawa mcDowell|satania/i, "胡桃沢=サタニキア=マクドウェル")
        .replace(/chisaki tapris sugarbell|tapris/i, "千咲=タプリス=シュガーベル")
        .replace(/shiraha raphiel ainsworth|raphiel|raphi/i, "白羽=ラフィエル=エインズワース")
        .replace(/kisaragi/i, "如月(アズールレーン)")
        .replace(/sagiri izumi|sagiri/i, "和泉紗霧")
        .replace(/eromanga sensei/i, "エロマンガ先生")
        .replace(/black tights/i, "黒タイツ")
        .replace(/white tights/i, "白タイツ")
        .replace(/konosuba/i, "この素晴らしい世界に祝福を!")
        .replace(/megumin/i, "めぐみん")
        .replace(/aqua/i, "アクア(このすば)")
        .replace(/kiniro mosaic/i, "きんいろモザイク")
        .replace(/karen kujo|karen/i, "九条カレン")
        .replace(/chino kafuu|chino/i, "香風智乃")
        .replace(/is the order a rabbit[\s\S]*/i, "ご注文はうさぎですか?")
        .replace(/tohru/i, "トール(小林さんちのメイドラゴン)")
        .replace(/kanna kamui|kanna/i, "カンナカムイ")
        .replace(/miss kobayashi[\s\S]*dragon maid|dragon maid/i, "小林さんちのメイドラゴン")
        .replace(/kancolle/i, "艦これ")
        .replace(/azur lane/i, "アズールレーン")
        .replace(/laffey/i, "ラフィー(アズールレーン)")
        .replace(/senko[\s\S]*san|senko/i, "仙狐さん")
        return tag
    }
}
